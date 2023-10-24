
const SSD_MOBILENETV1 = 'ssd_mobilenetv1'
const TINY_FACE_DETECTOR = 'tiny_face_detector'


let selectedFaceDetector = SSD_MOBILENETV1

// ssd_mobilenetv1 options
let minConfidence = 0.5

// tiny_face_detector options
let inputSize = 512
let scoreThreshold = 0.5

function getFaceDetectorOptions() {
  return selectedFaceDetector === SSD_MOBILENETV1
    ? new faceapi.SsdMobilenetv1Options({ minConfidence })
    : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

function onIncreaseMinConfidence() {
  minConfidence = Math.min(faceapi.utils.round(minConfidence + 0.1), 1.0)
  $('#minConfidence').val(minConfidence)
  updateResults()
}


function onDecreaseMinConfidence() {
  minConfidence = Math.max(faceapi.utils.round(minConfidence - 0.1), 0.1)
  $('#minConfidence').val(minConfidence)
  updateResults()
}

function onInputSizeChanged(e) {
  changeInputSize(e.target.value)
  updateResults()
}

function handleSubmitImg(){
  const queryString = window.location.search;
  const btn=$('.mb-btn-again')
  const loadImg=$('.mb-loading-img')
  const loadContainer=$('.mb-overlay-2');
  const textNotice=$('.mb-text-notice');
  const textLoad=$('.mb-text-wait')
  const urlSearchParams = new URLSearchParams(queryString);
  const canvas =$('#screem-shoot').get(0);
  const image=$('.mb-img-container').get(0);
  
  const searchQuery = urlSearchParams.get("type");
  const imgHeight=image.height;
  const imgWidth=image.width;
  canvas.height=imgHeight;
  canvas.width=imgWidth;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0,imgWidth,imgHeight)
  const resizedBase64Image = canvas.toDataURL('image/jpeg');
  image.src=resizedBase64Image;
  let uriImg=resizedBase64Image;

  httpRequest('post','/api/userdata',{uriImg,type:searchQuery}).then(res=>{
    setTimeout(() => {
      textLoad.hide()
      if(res.data==='success'){
        loadImg.get(0).src='/MissionDone.jpg'
        textNotice.show()
        textNotice.get(0).innerText='Thành Công vui lòng đợi 1 tí để server cập nhâp'
      }
      else{
        btn.show();
        loadImg.get(0).src='/confusingmeme.PNG'
        textNotice.show();
        textNotice.get(0).style.left='20px'
        textNotice.get(0).style.color='#b89300'
        textNotice.get(0).innerText='Không thể xác thực được khuôn mặt'
      }
      
    }, 2000);
  })
  loadContainer.show();
}

function changeInputSize(size) {
  inputSize = parseInt(size)

  const inputSizeSelect = $('#inputSize')
  inputSizeSelect.val(inputSize)
  inputSizeSelect.material_select()
}

function onIncreaseScoreThreshold() {
  scoreThreshold = Math.min(faceapi.utils.round(scoreThreshold + 0.1), 1.0)
  $('#scoreThreshold').val(scoreThreshold)
  updateResults()
}

function onDecreaseScoreThreshold() {
  scoreThreshold = Math.max(faceapi.utils.round(scoreThreshold - 0.1), 0.1)
  $('#scoreThreshold').val(scoreThreshold)
  updateResults()
}

function onIncreaseMinFaceSize() {
  minFaceSize = Math.min(faceapi.utils.round(minFaceSize + 20), 300)
  $('#minFaceSize').val(minFaceSize)
}

function onDecreaseMinFaceSize() {
  minFaceSize = Math.max(faceapi.utils.round(minFaceSize - 20), 50)
  $('#minFaceSize').val(minFaceSize)
}

function getCurrentFaceDetectionNet() {
  if (selectedFaceDetector === SSD_MOBILENETV1) {
    return faceapi.nets.ssdMobilenetv1
  }
  if (selectedFaceDetector === TINY_FACE_DETECTOR) {
    return faceapi.nets.tinyFaceDetector
  }
}

function isFaceDetectionModelLoaded() {
  return !!getCurrentFaceDetectionNet().params
}

async function changeFaceDetector(detector) {
  ['#ssd_mobilenetv1_controls', '#tiny_face_detector_controls']
    .forEach(id => $(id).hide())

  selectedFaceDetector = detector
  const faceDetectorSelect = $('#selectFaceDetector')
  faceDetectorSelect.val(detector)
  faceDetectorSelect.material_select()

  $('#loader').show()
  if (!isFaceDetectionModelLoaded()) {
    await getCurrentFaceDetectionNet().load('/')
  }

  $(`#${detector}_controls`).show()
  $('#loader').hide()
}

async function onSelectedFaceDetectorChanged(e) {
  selectedFaceDetector = e.target.value

  await changeFaceDetector(e.target.value)
  updateResults()
}

function initFaceDetectionControls() {
  const faceDetectorSelect = $('#selectFaceDetector')
  faceDetectorSelect.val(selectedFaceDetector)
  faceDetectorSelect.on('change', onSelectedFaceDetectorChanged)
  faceDetectorSelect.material_select()

  const inputSizeSelect = $('#inputSize')
  inputSizeSelect.val(inputSize)
  inputSizeSelect.on('change', onInputSizeChanged)
  inputSizeSelect.material_select()
}