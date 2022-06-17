const {Translate} = require('@google-cloud/translate').v2;
credentials = require('../requirements/e-context-352808-4e0fcdf3df45.json');
var fs = require('fs').promises;
var { parse } = require('csv-parse/sync');
async = require('async');
const TranslateModel = require('../models/translate.model');


exports.translateData = async function (req, res) {
    const translateFunction = new Translate({projectId: credentials.project_id ,credentials: credentials});
    const text = ['The text to translate, e.g. Hello, world!', 'The text to translate, e.g. Hello, world!'];
    const fileContent = await fs.readFile('/Users/nvipani/Desktop/translate-1/backend/requirements/Sheet1.csv');
    const records = parse(fileContent, {columns: true});
    async.forEachSeries(records, function (eachRecord, recordCallback) {
        const recordData = {
            phoneNumber: eachRecord.phone_number,
            farmerName: eachRecord.farmer_name,
            village: eachRecord.village_name,
            district: eachRecord.district_name,
            state: eachRecord.state_name,
            languageCode: 'en',
            language: 'English',
            user: req.user._id
        }
        TranslateModel.findOne({
            phoneNumber: eachRecord.phone_number
        }).
        then(translateModelData => {
            if(!translateModelData) {
                TranslateModel.create(recordData)
                .then(data => {
                    const recordList = [eachRecord.phone_number, eachRecord.farmer_name, eachRecord.village_name, eachRecord.district_name, eachRecord.state_name]
                    const targets = ['pa', 'te'];
                    const languageOb = {
                        'pa': 'Punjabi',
                        'te': 'Telugu'
                    }
                    async.forEachSeries(targets, function (eachTarget, targetCallback) {
                        translateFunction.translate(recordList, eachTarget).then(([res]) => {
                            const translatedData = {
                                phoneNumber: res[0],
                                farmerName: res[1],
                                village: res[2],
                                district: res[3],
                                state: res[4],
                                languageCode: eachTarget,
                                language: languageOb[eachTarget],
                                user: req.user._id
                            }
                            TranslateModel.create(translatedData)
                            .then(trData => {
                                console.log(translatedData)
                                targetCallback();
                            });
                        });
                    }, function() {
                        console.log(recordData);
                        recordCallback();
                    });
                })
                .catch(err => {
                    res.json({ error: err });
                });
            }
            else {
                res.json({status: 'Data already translated'});
            }
        });
    });
}