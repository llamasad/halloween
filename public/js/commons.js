async function requestExternalImage(imageUrl) {
  const res = await fetch('fetch_external_image', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ imageUrl })
  })
  if (!(res.status < 400)) {
    console.error(res.status + ' : ' + await res.text())
    throw new Error('failed to fetch image from url: ' + imageUrl)
  }
  let blob
  console.log(res)
  try {
    console.log(res.blob);
    blob = await res.blob()
    console.log(blob)
    let abc= await faceapi.bufferToImage(blob)
    console.log(abc)
    return abc
  } catch (e) {
    console.error('received blob:', blob)
    console.error('error:', e)
    throw new Error('failed to load image from url: ' + imageUrl)
  }
}

async function httpRequest(type='get',path='/',value={}){
try{  switch(type){ 
   case 'post':
       return await axios[type](path,value);
       
   case 'get':
       return await axios[type](path,value);
    default:
      return;
   }}
   catch(error){
    console.warn('axios error:'+error)
   }

}

async function drawLandMark(img){
    if (!isFaceDetectionModelLoaded()) {
      // setTimeout(drawLandMark,0)
      console.log('error')
      return
    }

    const options = getFaceDetectorOptions()

    const results = await faceapi.detectAllFaces(img, options).withFaceLandmarks()
    console.log(results)
    const canvas = $('.dt-img-usr--landmark').get(0)
    faceapi.matchDimensions(canvas, img)
    const resizedResults = faceapi.resizeResults(results, img)


      faceapi.draw.drawDetections(canvas, resizedResults)

    faceapi.draw.drawFaceLandmarks(canvas, resizedResults)
  
}

function renderUserUI(data){
  $('.dt-upper-layout1').show()
  const time=$('.dt-text--time');
  const age=$('.dt-text--age');
  const gender=$('.dt-text--gender')
  const status =$('.dt-text--status')
  const type= $('.dt-text--type')
  const img=$('.dt-img-usr--none');
  const takeAGift=$('.dt-text takeagift')
  age.text(`${Number(data[0].age[0])-1}-${Number(data[0].age[0])+1}`)
  time.text(data[0].createAt)
  gender.text(data[0].gender[0]=='female'?'Nữ giới':'Nam giới')
  status.text(data[0].status[0]=='neutral'?'Bình thường':data[0].status[0]=='happy'?'vui vẻ':data[0].status[0]=='angry'?'tức giận':data[0].status[0]=='sad'?'buồn':data[0].status[0]=='fearful'?'sợ hãi':'bất ngờ')
  type.text(data[0].type=='cos'?'cosplay':'không cosplay')
  takeAGift.text(`ấn vào phía duới để nhận ${data[0].type=='cos'?2:1} lần quay`)
  img.attr("src", data[0].image)
  $('#redirect-spin-wheel').attr('href',`./spinweel?turn=${data[0].type=='cos'?2:1}`)
  $('.takeagift').text(`ấn vào phía dưới để nhận ${data[0].type=='cos'?2:1} lần quay`)
  $('.dt-img-usr--landmark1').attr("src", data[0].image)
  drawLandMark(img.get(0))
}
function loopGetRequest(){
  let counterSeq=Number(localStorage.getItem("counterSeq")); 
  httpRequest('get','/api/userdata',{params:{counterSeq}}).then((res=>{
    console.log(res.data)
    if(res.data.valid==='notthing!'){
      setTimeout(loopGetRequest,2000)
    }
    else if(res.data.valid==='success!'){
      renderUserUI(res.data.result)
      counterSeq=counterSeq+1;
      localStorage.setItem("counterSeq",counterSeq)
    }
  })
  )
}


function renderNavBar(navbarId, exampleUri) {
  const examples = [
    {
      uri: 'face_detection',
      name: 'Face Detection'
    },
    {
      uri: 'face_landmark_detection',
      name: 'Face Landmark Detection'
    },
    {
      uri: 'face_expression_recognition',
      name: 'Face Expression Recognition'
    },
    {
      uri: 'age_and_gender_recognition',
      name: 'Age and Gender Recognition'
    },
    {
      uri: 'face_recognition',
      name: 'Face Recognition'
    },
    {
      uri: 'face_extraction',
      name: 'Face Extraction'
    },
    {
      uri: 'video_face_tracking',
      name: 'Video Face Tracking'
    },
    {
      uri: 'webcam_face_detection',
      name: 'Webcam Face Detection'
    },
    {
      uri: 'webcam_face_landmark_detection',
      name: 'Webcam Face Landmark Detection'
    },
    {
      uri: 'webcam_face_expression_recognition',
      name: 'Webcam Face Expression Recognition'
    },
    {
      uri: 'webcam_age_and_gender_recognition',
      name: 'Webcam Age and Gender Recognition'
    },
    {
      uri: 'bbt_face_landmark_detection',
      name: 'BBT Face Landmark Detection'
    },
    {
      uri: 'bbt_face_similarity',
      name: 'BBT Face Similarity'
    },
    {
      uri: 'bbt_face_matching',
      name: 'BBT Face Matching'
    },
    {
      uri: 'bbt_face_recognition',
      name: 'BBT Face Recognition'
    },
    {
      uri: 'batch_face_landmarks',
      name: 'Batch Face Landmark Detection'
    },
    {
      uri: 'batch_face_recognition',
      name: 'Batch Face Recognition'
    }
  ]

  const navbar = $(navbarId).get(0)
  const pageContainer = $('.page-container').get(0)

  const header = document.createElement('h3')
  header.innerHTML = examples.find(ex => ex.uri === exampleUri).name
  pageContainer.insertBefore(header, pageContainer.children[0])

  const menuContent = document.createElement('ul')
  menuContent.id = 'slide-out'
  menuContent.classList.add('side-nav', 'fixed')
  navbar.appendChild(menuContent)

  const menuButton = document.createElement('a')
  menuButton.href='#'
  menuButton.classList.add('button-collapse', 'show-on-large')
  menuButton.setAttribute('data-activates', 'slide-out')
  const menuButtonIcon = document.createElement('img')
  menuButtonIcon.src = 'menu_icon.png'
  menuButton.appendChild(menuButtonIcon)
  navbar.appendChild(menuButton)

  const li = document.createElement('li')
  const githubLink = document.createElement('a')
  githubLink.classList.add('waves-effect', 'waves-light', 'side-by-side')
  githubLink.id = 'github-link'
  githubLink.href = 'https://github.com/justadudewhohacks/face-api.js'
  const h5 = document.createElement('h5')
  h5.innerHTML = 'face-api.js'
  githubLink.appendChild(h5)
  const githubLinkIcon = document.createElement('img')
  githubLinkIcon.src = 'github_link_icon.png'
  githubLink.appendChild(githubLinkIcon)
  li.appendChild(githubLink)
  menuContent.appendChild(li)

  examples
    .forEach(ex => {
      const li = document.createElement('li')
      if (ex.uri === exampleUri) {
        li.style.background='#b0b0b0'
      }
      const a = document.createElement('a')
      a.classList.add('waves-effect', 'waves-light', 'pad-sides-sm')
      a.href = ex.uri
      const span = document.createElement('span')
      span.innerHTML = ex.name
      span.style.whiteSpace = 'nowrap'
      a.appendChild(span)
      li.appendChild(a)
      menuContent.appendChild(li)
    })

  $('.button-collapse').sideNav({
    menuWidth: 260
  })
}

function renderSelectList(selectListId, onChange, initialValue, renderChildren) {
  const select = document.createElement('select')
  $(selectListId).get(0).appendChild(select)
  renderChildren(select)
  $(select).val(initialValue)
  $(select).on('change', (e) => onChange(e.target.value))
  $(select).material_select()
}

function renderOption(parent, text, value) {
  const option = document.createElement('option')
  option.innerHTML = text
  option.value = value
  parent.appendChild(option)
}