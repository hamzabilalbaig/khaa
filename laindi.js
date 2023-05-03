const Cheetah = require("@picovoice/cheetah-node");

const accessKey = "WnorwqdAzvh6QQnueFfPk8eaO5MtAABYD7Udq3UGvtK7RB7ttuoisQ=="; // Obtained from the Picovoice Console (https://console.picovoice.ai/)
const endpointDurationSec = 2.0;
const handle = new Cheetah(accessKey);

function getNextAudioFrame() {
  // ...
  return audioFrame;
}

while (true) {
  const audioFrame = getNextAudioFrame();
  const [partialTranscript, isEndpoint] = handle.process(audioFrame);
  if (isEndpoint) {
    finalTranscript = handle.flush()
  }
}