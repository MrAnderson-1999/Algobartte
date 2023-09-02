// Get a reference to the button and video elements in the DOM
import { getDominantEmotionString } from './emotion_detector.js';

const configDataAgg = {initialWaitMs: 2000, periodMs: 1000};
const morphcastKey = "e2e6f51b68d5489178c7a027e5a2dec22a68a51e8551";
const button = document.getElementById("camera-btn");
const cameraContainer = document.getElementById("cameraContainer");
const cameraVideoElement = document.getElementById("camera-preview");
const faceEmotionResultElement = document.getElementById("face-emotion-result");
const configFaceDetector = { maxInputFrameSize: 640, smoothness: 0.83 };
const configEmotionDetector = { smoothness: 0.90 };
const configEmotion = { smoothness: 0.90 };
const stopButton = document.getElementById("stopButton")


// Initialize cameraStream variable
let cameraStream;
let morphcast;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Add a click event listener to the button
button.addEventListener("click", () => {
  // Use the openCamera() function to access the camera stream and display the preview
  cameraContainer.classList.add("camera-open");
  openCamera();
});

// Add a click event listener to the stop button
stopButton.addEventListener("click", () => {
  // Remove the "camera-open" class to hide the camera container and remove the blur effect
  cameraContainer.classList.remove("camera-open");
  stopCameraStream();
});


// Define the openCamera() function
function openCamera() {
  // Access camera stream
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      cameraStream = stream;
      // Set camera stream as srcObject for camera video element
      cameraVideoElement.srcObject = cameraStream;
      // Play camera video element
      cameraVideoElement.play();
      // Position camera preview element at the top corner of the desktop preview element
      cameraVideoElement.style.position = "absolute";
      cameraVideoElement.style.top = "0";
      cameraVideoElement.style.right = "0";
      cameraContainer.style.display = "block";

      // Initialize Morphcast API
      class ScriptLoader {
        static loadScript(url, config = null) {
          return new Promise(resolve => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {  //IE
              script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                  script.onreadystatechange = null;
                  resolve();
                }
              };
            } else {  //Others
              script.onload = function () {
                resolve();
              };
            }
            if (config) {
              script.setAttribute('data-config', config);
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
          });
        }
      
        static downloadAiSDK() {
          if (ScriptLoader.p == null) {
            ScriptLoader.p = ScriptLoader.loadScript("https://sdk.morphcast.com/mphtools/v1.1/mphtools.js", "cameraPrivacyPopup, compatibilityUI, compatibilityAutoCheck")
              .then(() => ScriptLoader.loadScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js"))
              .then(() => CY); // CY is a global var
          }
          return ScriptLoader.p;
        }
      }
      
      ScriptLoader.downloadAiSDK().then((CY) => { 
      CY.loader()
        .licenseKey("e2e6f51b68d5489178c7a027e5a2dec22a68a51e8551")
        .addModule(CY.modules().FACE_EMOTION.name, {smoothness: 0.40})
        .addModule(CY.modules().FACE_DETECTOR.name, {maxInputFrameSize: 320, smoothness: 0.83})
        .addModule(CY.modules().DATA_AGGREGATOR.name, {initialWaitMs: 2000, periodMs: 1000})
        .load()
        .then(({ start, stop }) => start());
      
      window.addEventListener(CY.modules().EVENT_BARRIER.eventName, (evt) => {
        console.log('EVENT_BARRIER result', evt.detail);
      });
      
      window.addEventListener(CY.modules().DATA_AGGREGATOR.eventName, (evt) => {
        console.log('DATA_AGGREGATOR result', evt.detail);
      });
      
      MphTools.CameraPrivacyPopup.setText({
        title: "Allow us to use your camera",
        description: "This experience is designed to be viewed with your camera on. The next screen will ask your consent to access data from your camera.",
        url: "http://localhost:5000/privacy",
      });
      
      });
      
    }
}

// Define the stopCameraStream() function
function stopCameraStream() {
  // Stop the camera stream
  cameraStream.getTracks().forEach(track => track.stop());
  // Remove the srcObject from the camera video element
  cameraVideoElement.srcObject = null;
  // Stop Morphcast API
  morphcast.stop();
  morphcast = null;
  cameraContainer.style.display = "none";
}