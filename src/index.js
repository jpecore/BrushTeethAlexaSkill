/** 
    
   BrushTeethSkill 
       
     
     
     
 */

/**
 * This Skill was based on the History Buff example skill which demonstrates how
 * to create a Lambda function for handling Alexa Skill requests that: - Web
 * service: communicate with an external web service to get events for specified
 * days in history (Mediawiki API) - Pagination: after obtaining a list of
 * events, read a small subset of events and wait for user prompt to read the
 * next subset of events by maintaining session state - Dialog and Session
 * state: Handles two models, both a one-shot ask and tell model, and a
 * multi-turn dialog model. - SSML: Using SSML tags to control how Alexa renders
 * the text-to-speech.
 *  
 * 
 * 
 * /** App ID for the skill
 */
var APP_ID = ''; // brush teeth
 

/**
 * The AlexaSkill Module that has the AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * BrushTeethSkill is a child of AlexaSkill. To read more about inheritance in
 * JavaScript, see the link below.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var BrushTeethSkill = function() {
	AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BrushTeethSkill.prototype = Object.create(AlexaSkill.prototype);
BrushTeethSkill.prototype.constructor = BrushTeethSkill;
BrushTeethSkill.prototype.eventHandlers.onSessionStarted = function(
		sessionStartedRequest, session) {
	console.log("BrushTeethSkill onSessionStarted requestId: "
			+ sessionStartedRequest.requestId + ", sessionId: "
			+ session.sessionId);

	// any session init logic would go here
	
	
};



/* global variables */
var FACTS = [{"time":5,"Text":"The enamel on the top surface on your tooth is the hardest part of your entire body. "}, 
             {"time":5,"Text":"Teeth start to form even before you are born. "}, 
             {"time":8,"Text":"Humans use four different types of teeth (incisors, canine, premolars, and molars) to cut, tear and grind their food"},
             {"time":5,"Text":"Keep brushing. You are doing great. "},
             {"time":5,"Text":"Don't stop brushing yet. "},
             {"time":5,"Text":"Keep going. Brushing can reduce your chance of tooth decay by 25 percent."},
             {"time":5,"Text":"In 1866, Lucy Beaman Hobbs became the first licensed female dentist. "},
             {"time":8,"Text":"Humans have only two sets of teeth in their entire lifetime—baby teeth and permanent teeth. Once you have your permanent teeth, make sure you take good care of them.. "},
             {"time":5,"Text":"No two people have the same set of teeth—your teeth are as unique as your fingerprint. "},
             {"time":5,"Text":"Many diseases are linked to your oral health. So be sure to brush every day. "},
             {"time":5,"Text":"Brush each surface,  outside, tops, and inside too. "},
             {"time":8,"Text":"Most adults have 32 teeth. Though miniscule in size comparison, mosquitos have about 47 teeth, and snails have about 25 teeth . . . on their tongues. "},
             {"time":5,"Text":"Humans have two sets of teeth during their lifetime, while sharks have around 40 sets of teeth. "},
             {"time":5,"Text":"One third of your teeth are underneath your gums. "},
             {"time":8,"Text":"Before this invention of toothpaste, people used ground chalk, ashes, lemon juice, and honey mixtures to clean their teeth. "},
             {"time":5,"Text":"Brushing stimulates the gums, which helps to keep them healthy and prevent gum disease. "},
             {"time":5,"Text":"More people use blue toothbrushes than red ones. "},
             {"time":5,"Text":"Dogs have 42 teeth, cats have 30 teeth, pigs have 44 teeth, and an armadillo has 104 teeth. "},
             {"time":5,"Text":"Their is a special Bird that flies into the open mouth of a crocodile and cleans the their teeth. "},          
             {"time":5,"Text":"Brush each surface - outside, the tops, and inside too. "}];



 
/* onLaunch */
BrushTeethSkill.prototype.eventHandlers.onLaunch = function(launchRequest,
		session, response) {
	console.log("BrushTeethSkill onLaunch requestId: " + launchRequest.requestId
			+ ", sessionId: " + session.sessionId);
	getWelcomeResponse(response);
};

/* onSessionEnded */
BrushTeethSkill.prototype.eventHandlers.onSessionEnded = function(
		sessionEndedRequest, session) {
	console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
			+ ", sessionId: " + session.sessionId);
	// any session cleanup logic would go here
	
};

/* intents */
BrushTeethSkill.prototype.intentHandlers = {
	 
		"brushTeethIntent" : function(intent, session, response) {
			console.log("brushTeethIntent   requestId: "  
					+ ", sessionId: " + session.sessionId);
			getWelcomeResponse(response);
		},
		
		
	"AMAZON.HelpIntent" : function(intent, session, response) {
		var speechText =  "Just tell alexa to, ask Brush Teeth to start. It will start giving encouragements and facts about teeth  for two minutes.";
		var repromptText = "I did not understand you. The only command is open Brush Teeth. what would you  like to do?";
		var speechOutput = {
			speech : speechText,
			type : AlexaSkill.speechOutputType.PLAIN_TEXT
		};
		var repromptOutput = {
			speech : repromptText,
			type : AlexaSkill.speechOutputType.PLAIN_TEXT
		};
		response.ask(speechOutput, repromptOutput);
	},

	"AMAZON.StopIntent" : function(intent, session, response) {
		var speechOutput = {
			speech : "Good bye!",
			type : AlexaSkill.speechOutputType.PLAIN_TEXT
		};
		response.tell(speechOutput);
	},

	"AMAZON.CancelIntent" : function(intent, session, response) {
		var speechOutput = {
			speech : "Good bye!",
			type : AlexaSkill.speechOutputType.PLAIN_TEXT
		};
		response.tell(speechOutput);
	}
};

/**
 * Function to handle the onLaunch skill behavior
 */

function getWelcomeResponse(response) {
	// If we wanted to initialize the session to have some attributes we could
	// add those here.
	var totalTime = 0;
	var repromptText = "I did not understand. What did you say?";
	var speechText = "<p>Start brushing your teeth now. I will tell you when two minutes is over.</p><break time='5s' /> ";
	var totalTime =  totalTime + 4 + 5;
	
	shuffle(FACTS);
	var totalTime
	for (var i = 0; i < FACTS.length; i++) {
		
		if (totalTime > 60 && totalTime < 66) {
			speechText = speechText + ("Over half way done. Keep up the good brushing. <break time='5s' />" );
			totalTime =  totalTime + 3 + 5;
		} else {
			speechText = speechText + (FACTS[i].Text + "<break time='5s' />" );
			totalTime =  totalTime + FACTS[i].time + 5;
		}
			
		if (totalTime > 120) { break; }
		
	
	}
	console.log ("totalTime =" + totalTime);
	speechText = speechText + "Time is up. You did a great job. ";
	
	var cardOutput = "";
	// If the user either does not reply to the welcome message or says
	// something that is not
	// understood, they will be prompted again with this text.

	var speechOutput = {
		speech : "<speak>" + speechText + "</speak>",
		type : AlexaSkill.speechOutputType.SSML
	};
	var repromptOutput = {
		speech : repromptText,
		type : AlexaSkill.speechOutputType.PLAIN_TEXT
	};
		
	response.tell(speechOutput, repromptOutput);	
	
}
 

function buildSpeechletResponseWithoutCard(output, repromptText,shouldEndSession) {
	return {
		outputSpeech : {
			type : "PlainText",
			text : output
		},
		reprompt : {
			outputSpeech : {
				type : "PlainText",
				text : repromptText
			}
		},
		shouldEndSession : shouldEndSession
	};
}
  
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}



// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
	// Create an instance of the BrushTeethSkill.
	var skill = new BrushTeethSkill();
	skill.execute(event, context);
};