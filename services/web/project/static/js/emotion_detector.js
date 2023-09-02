// const IMG_OUTER_WIDTH = 1.2;
// const IMG_INNER_WIDTH = 1;
// const IMG_X_OFFSET = 0.08;

// const IMG_OUTER_HEIGHT = 0.86;
// const IMG_INNER_HEIGHT = 1;
// const IMG_Y_OFFSET = 0.014;

// const PIN_RADIUS = 0.4;

// const img_ratio = IMG_OUTER_WIDTH/IMG_OUTER_HEIGHT;
// const pin_radius_x = PIN_RADIUS/img_ratio;

// // For now I defined values just as the data generator gives them. Need to think how to calculate this here and in the setCordinats function below.
// const emotionMap = {
//   "feelings": {
//     "Angry": ["-0.4", "0.2"],
//     "Happy": ["0.65", "0"],
//     "Surprised": ["-0.3", "-0.5"],
//     "Sad": ["-1", "-0.5"],
//     "Neutral": ["-0.3", "-0.3"]
//   }
// };


// export function getDominantEmotionString(valence, arousal) {
//   const {x,y} = getCordinats({ valence, arousal });
//   const tolerance = 0.3; // Adjust the tolerance level as needed
//   //const {cordinatX, cordinatY} = setCordinats({x, y}); Need to think it throught here, apply some kind of smart function to calculate the cordinats.

//   for (let key in emotionMap.feelings) {
//     const emotionX = parseFloat(emotionMap.feelings[key][0]);
//     const emotionY = parseFloat(emotionMap.feelings[key][1]);

//     // THis is the returning of sd
//     if (Math.abs(emotionX - x) <= tolerance && Math.abs(emotionY - y) <= tolerance) {
//       return key;
//     }
//   }
//   // Return a default value or handle cases when no match is found
//   return "Unknown";
// }

// // The pinpoint dot of the evaluated emotion
// function getCordinats({valence, arousal}) {

//   const normalized = (z) => (z + 1)/2;

//   return {
//     x: (IMG_X_OFFSET + IMG_INNER_WIDTH * normalized(valence))/IMG_OUTER_WIDTH,
//     y: (IMG_Y_OFFSET + IMG_INNER_HEIGHT * normalized(arousal))/IMG_OUTER_HEIGHT
//   }
// }

// //function setCordinats({x, y}) {
// //    return{
// //      cordinatX: `${x - pin_radius_x}%`, // check img ratio to avoid ellipse
// //      cordinatY: `${y - PIN_RADIUS}%`
// //    }
// //}
