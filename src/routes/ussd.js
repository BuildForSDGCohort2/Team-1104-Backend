'use strict';
require('dotenv').config();
const randomstring = require('randomstring');

const farmerController = require('../controllers/farmerController');
const ussdController = require('../controllers/ussdController');
const ussdSessionController = require('../controllers/ussdsessionController');
const countiesController = require('../controllers/countiesController');
const subcountyController = require('../controllers/subcountyController');
const wardController = require('../controllers/wardController');
const helper = require('../helpers/helpers');
const msg = require('../helpers/sendMessage');

const optsUssd = {
  schema: {
    description: 'Ussd Endpoint Route for DigiVet App',
    tags: ['ussd'],
    body: {
      type: 'object',
      required: ['sessionId', 'networkCode', 'phoneNumber', 'serviceCode'],
      properties: {
        sessionId: { type: 'string' },
        networkCode: { type: 'string' },
        serviceCode: { type: 'string' },
        phoneNumber: { type: 'string', maxLength: 13, minLength: 13 },
        text: { type: 'string', default: '' }
      }
    },

    response: {
      200: {
        description: 'Success Response',
        content: 'text/plain',
        type: 'object'
      },
      400: {
        description: 'Error Response',
        content: 'application/json',
        type: 'object'
      }
    }
  }
};

module.exports = function (fastify, options, done) {
  fastify.post('/ussd', optsUssd, async (request, reply) => {
    let isRegistered = false;
    let isAssessed = false;
    let message = '';
    let data;
    // let registrationLevel = 0;
    const sessionid = request.body.sessionId;
    const { serviceCode, networkCode, text } = request.body;
    const phoneNumber = request.body.phoneNumber.slice(1);
    const zipCode = phoneNumber.slice(0, 3);
    // message = 'END Invalid Phone Number';
    if (zipCode !== '254') {
      message = 'END Invalid Phone Number';
      reply.code(200).header('Content-Type', 'text/plain').send(message);
    }

    const txt = request.body.text.split(/[*#]/);
    const txtlen = txt.length;
    let level;
    let sublevel;
    const sessionStatus = await ussdSessionController.getUssdSession({
      sessionId: sessionid
    });
    if (sessionStatus) {
      isAssessed = sessionStatus.assessedstatus;
      isRegistered = sessionStatus.regstatus;
    }
    if (text === '') {
      // save ussd session to Database here
      await ussdSessionController.addussdSession({
        userId: phoneNumber,
        sessionId: sessionid,
        serviceCode: serviceCode,
        level: 0
      });
      // check if farmer is registered for ussd services
      const farmer = await ussdController.getUserByPhone({
        phone: phoneNumber
      });

      // if not registered prompt the farmer to register
      if (!farmer) {
        message = 'CON Welcome to DigiVet \n';
        message += 'Reply with 1 to Register \n';
        message += '1: Register\n';
        // if registered let the farmer access the menus
      } else {
        const registeredFarmer = await farmerController.getFarmerById({
          id: farmer.userId
        });

        if (registeredFarmer) {
          const farmerName = helper.toTitleCase(registeredFarmer.firstName);
          ussdSessionController.updateussdSession({
            updateData: { regstatus: true },
            sessionId: sessionid
          });
          switch (registeredFarmer.assessed) {
            case true:
              ussdSessionController.updateussdSession({
                updateData: { assessedstatus: true },
                sessionId: sessionid
              });
              message = `CON Welcome ${farmerName} to DigiVet \n`;
              message += 'Menu\n';
              message += '1: My Farm\n';
              message += '2: Learn\n';
              message += '3: Loans\n';
              message += '4: Vet\n';
              break;
            case false:
              isAssessed = false;
              message = `CON Welcome ${farmerName} to DigiVet \n`;
              message += 'Menu\n';
              message += '1: My Farm\n';
              message += '2: Learn\n';
              message += '3: Assesment\n';
              break;

            default:
              message = 'END Error contact Digivet Admin';
              break;
          }
        } else {
          message = 'END Error contact Digivet Admin';
        }
      }
    } else if (isAssessed === true && isRegistered === true) {
      const ussdLevelAssessed = await ussdSessionController.getUssdSession({
        sessionId: sessionid
      });
      level = ussdLevelAssessed.level;
      sublevel = ussdLevelAssessed.sublevel;
      data = ussdLevelAssessed.data === undefined ? [] : ussdLevelAssessed.data;
      switch (level) {
        case 0:
          if (!txt[txtlen - 1].match(/[1-4]/)) {
            message = 'CON INVALID SELECTION\n';
            message += ' Menu\n';
            message += '1: My Farm\n';
            message += '2: Learn\n';
            message += '3: Loans\n';
            message += '4: Vet\n';
          } else {
            ussdSessionController.updateussdSession({
              updateData: { level: level + 1 },
              sessionId: sessionid
            });
            if (parseInt(txt[txtlen - 1]) === 1) {
              ussdSessionController.updateussdSession({
                updateData: { sublevel: 1 },
                sessionId: sessionid
              });
              message = `CON My Farm \n`;
              message += '1: Livestock\n';
              message += '2: Health\n';
              message += '3: Breeding\n';
            } else if (parseInt(txt[txtlen - 1]) === 2) {
              ussdSessionController.updateussdSession({
                updateData: { sublevel: 2 },
                sessionId: sessionid
              });
              message = `CON Learn \n`;
              message += '1: Topics\n';
              message += '2: Ask\n';
            } else if (parseInt(txt[txtlen - 1]) === 3) {
              ussdSessionController.updateussdSession({
                updateData: { sublevel: 3 },
                sessionId: sessionid
              });
              message = `CON Loans \n`;
              message += 'No Loans Currently\n';
              message += '0: Back 1: Exit\n';
            } else if (parseInt(txt[txtlen - 1]) === 4) {
              ussdSessionController.updateussdSession({
                updateData: { sublevel: 4 },
                sessionId: sessionid
              });
              message = `CON Vet \n`;
              message += '1: AI\n';
              message += '2: Sick Cow\n';
            }
          }
          break;
        case 1:
          break;

        default:
          message = 'END Invalid Selection';
          break;
      }
    } else if (isAssessed === false && isRegistered === true) {
      const ussdLevelUAssessed = await ussdSessionController.getUssdSession({
        sessionId: sessionid
      });
      sublevel = ussdLevelUAssessed.sublevel;
      level = ussdLevelUAssessed.level;
      data =
        ussdLevelUAssessed.data === undefined ? [] : ussdLevelUAssessed.data;
      switch (level) {
        case 0:
          if (!txt[txtlen - 1].match(/[1-3]/)) {
            message = 'CON INVALID SELECTION\n';
            message += 'Menu\n';
            message += '1: My Farm\n';
            message += '2: Learn\n';
            message += '3: Assesment\n';
          } else {
            ussdSessionController.updateussdSession({
              updateData: { level: level + 1 },
              sessionId: sessionid
            });
            if (parseInt(txt[txtlen - 1]) === 1) {
              ussdSessionController.updateussdSession({
                updateData: { sublevel: 1 },
                sessionId: sessionid
              });
              message = `CON My Farm \n`;
              message += '1: Livestock\n';
              message += '2: Health\n';
              message += '3: Breeding\n';
            } else if (parseInt(txt[txtlen - 1]) === 2) {
              ussdSessionController.updateussdSession({
                updateData: { sublevel: 2 },
                sessionId: sessionid
              });
              message = `CON Learn \n`;
              message += '1: Topics\n';
              message += 'No Topics yet\n';
              message += '0: Back 00: Main Menu 1: Exit\n';
            } else if (parseInt(txt[txtlen - 1]) === 3) {
              ussdSessionController.updateussdSession({
                updateData: { sublevel: 3 },
                sessionId: sessionid
              });
              message = `CON Assesment \n`;
              message += '1: Yes\n';
              message += '0: Back 1: Exit\n';
            }
          }
          break;
        case 1:
          if (parseInt(txt[txtlen - 1]) === 1 && parseInt(sublevel) === 1) {
            message = 'CON Cow Registration\n';
            message += 'Enter Cow Name\n';
          } else if (
            parseInt(txt[txtlen - 1]) === 2 &&
            parseInt(sublevel) === 1
          ) {
            message = `CON Topics \n`;
            message += 'Not Available\n';
            message += '0: Back 00: Main Menu 1: Exit\n';
          } else if (parseInt(txt[txtlen - 1]) && parseInt(sublevel) === 1) {
          } else if (
            parseInt(txt[txtlen - 1]) === 0 &&
            parseInt(sublevel) === 2
          ) {
            ussdSessionController.updateussdSession({
              updateData: { sublevel: 0, level: 1 },
              sessionId: sessionid
            });
            message = `CON My Farm \n`;
            message += '1: Livestock\n';
            message += '2: Health\n';
            message += '3: Breeding\n';
          }
          break;

        default:
          message = 'END Invalid Selection';
          break;
      }
    } else if (isRegistered === false && isAssessed === false) {
      const ussdLevel = await ussdSessionController.getUssdSession({
        sessionId: sessionid
      });
      level = ussdLevel.level;
      data = ussdLevel.data === undefined ? [] : ussdLevel.data;
      switch (level) {
        // 1st registration First Name
        case 0:
          ussdSessionController.updateussdSession({
            updateData: { level: level + 1 },
            sessionId: sessionid
          });
          message = 'CON Enter your First Name\n';
          break;

        // 2nd registration Last Name
        case 1:
          if (!txt[txtlen - 1].match(/^[A-Za-z]+$/)) {
            message = 'CON INVALID NAME \n';
            message += 'Enter your First Name\n';
          } else {
            message = 'CON Enter Last Name\n';
            ussdSessionController.updateussdSession({
              updateData: {
                level: level + 1,
                data: { ...data, firstName: txt[txtlen - 1] }
              },
              sessionId: sessionid
            });
          }
          break;

        // 3rd registration Last Name
        case 2:
          if (!txt[txtlen - 1].match(/^[A-Za-z ]+$/)) {
            message = 'CON INVALID NAME \n';
            message += 'Enter your Last Name\n';
          } else {
            message = 'CON Enter Your County Name\n';
            ussdSessionController.updateussdSession({
              updateData: {
                level: level + 1,
                data: { ...data, lastName: txt[txtlen - 1] }
              },
              sessionId: sessionid
            });
          }
          break;

        // 4th registration County Name
        case 3:
          if (!txt[txtlen - 1].match(/^[A-Za-z]+$/)) {
            message = 'CON INVALID COUNTY \n';
            message += 'Enter Correct County Name\n';
          } else {
            const cname = helper.toTitleCase(txt[txtlen - 1]);
            const county = await countiesController.getCounty({
              countyName: cname
            });
            if (!county) {
              message = 'CON INVALID COUNTY \n';
              message += 'Enter Correct County Name\n';
            } else {
              message = `CON ${txt[txtlen - 1].toUpperCase()} County \n`;
              message += 'Enter Your Sub County Name\n';
              ussdSessionController.updateussdSession({
                updateData: {
                  level: level + 1,
                  data: { ...data, county: cname }
                },
                sessionId: sessionid
              });
            }
          }
          break;

        // 5th registration Sub County
        case 4:
          const countyIdx = await ussdSessionController.getUssdSession({
            sessionId: sessionid
          });
          if (!txt[txtlen - 1].match(/^[A-Za-z ]+$/)) {
            message = `CON ${countyIdx.data.county.toUpperCase()} County \n`;
            message += 'Enter Correct Sub County Name\n';
          } else {
            const scname = helper.toTitleCase(txt[txtlen - 1]);
            const subCounty = await subcountyController.getSubCounty({
              county: countyIdx.data.county,
              subCounty: scname
            });
            if (!subCounty) {
              message = `CON ${countyIdx.data.county.toUpperCase()} County \n`;
              message += 'Enter Correct Sub County Name\n';
            } else {
              ussdSessionController.updateussdSession({
                updateData: {
                  level: level + 1,
                  data: { ...data, subCounty: scname }
                },
                sessionId: sessionid
              });

              message = `CON ${countyIdx.data.county.toUpperCase()} County ${txt[
                txtlen - 1
              ].toUpperCase()} Sub County \n`;
              message += 'Enter Your Ward Name\n';
            }
          }
          break;

        // 6th registration ward
        case 5:
          const countyIdx2 = await ussdSessionController.getUssdSession({
            sessionId: sessionid
          });
          if (!txt[txtlen - 1].match(/^[A-Za-z ]+$/)) {
            message = 'CON INVALID WARD NAME\n';
            message += `${countyIdx2.data.county.toUpperCase()} County ${countyIdx2.data.subCounty.toUpperCase()} Sub County \n`;
            message += 'Enter Correct Ward Name\n';
          } else {
            const wname = helper.toTitleCase(txt[txtlen - 1]);
            const ward = await wardController.getWard({
              subCounty: countyIdx2.data.subCounty,
              ward: wname
            });
            if (!ward) {
              message = `CON ${countyIdx2.data.county.toUpperCase()} County County ${countyIdx2.data.subCounty.toUpperCase()} Sub County \n`;
              message += 'Enter Correct Ward Name\n';
            } else {
              ussdSessionController.updateussdSession({
                updateData: {
                  level: level + 1,
                  data: { ...data, ward: wname }
                },
                sessionId: sessionid
              });
              message = ' CON Choose Your Gender\n';
              message += '1: Male\n';
              message += '2: Female\n';
              message += '3: Other\n';
            }
          }
          break;

        // 6th registration Gender then Save Farmer
        case 6:
          if (!txt[txtlen - 1].match(/[1-3]/)) {
            message = 'CON INVALID SELECTION\n';
            message += ' Choose Your Gender\n';
            message += '1: Male\n';
            message += '2: Female\n';
            message += '3: Other\n';
          } else {
            let gender = '';
            switch (parseInt(txt[txtlen - 1])) {
              case 1:
                gender = 'Male';
                break;
              case 2:
                gender = 'Female';
                break;
              case 3:
                gender = 'Other';
                break;
              default:
                gender = 'Other';
            }

            const lussd = await ussdSessionController.updateussdSession({
              updateData: {
                level: level + 1,
                data: { ...data, gender: gender }
              },
              sessionId: sessionid
            });

            if (lussd) {
              // generate reandom farmer number
              const farmerNo = randomstring.generate(6, true, {
                charset: '[A-Z 0-9]'
              });
              // generate pin for the farmer
              const pin = helper.generateRandomString(4);
              const regSession = await ussdSessionController.getUssdSession({
                sessionId: sessionid
              });
              if (regSession) {
                const newFarmer = await farmerController.addFarmer({
                  farmerNo: farmerNo,
                  firstName: helper.toTitleCase(regSession.data.firstName),
                  lastName: helper.toTitleCase(regSession.data.lastName),
                  phone: phoneNumber,
                  county: regSession.data.county,
                  subCounty: regSession.data.subCounty,
                  ward: regSession.data.ward,
                  gender: helper.toTitleCase(regSession.data.gender)
                });
                if (!newFarmer) {
                  message = 'END Registration Failed Try again';
                }
                const ussdReg = await ussdController.addussdUser({
                  userId: newFarmer.id,
                  pin: pin,
                  phone: phoneNumber,
                  userType: 'Farmer'
                });
                if (!ussdReg) {
                  farmerController.deleteFarmer({ id: newFarmer.id });
                  message = 'END Ussd Registration Failed Try again';
                }
                try {
                  const msgToSend = `Welcome to digivet services, you have been successfully registered, your pin is ${pin}`;
                  const smsInfo = await msg.sendMessage({
                    sendTo: phoneNumber,
                    message: msgToSend
                  });
                  if (smsInfo) {
                    message = 'END Registration Successful';
                  }
                } catch (error) {
                  message = 'END Registration Successful sms failed';
                }
              }
            } else {
              message = 'END Registration Failed Try again';
            }
          }
          break;
        default:
          message = 'END Invalid Selection';
      }
      // No
    } else {
      message = 'END Invalid Selection';
    }
    reply.code(200).header('Content-Type', 'text/plain').send(message);
  });
  done();
};
