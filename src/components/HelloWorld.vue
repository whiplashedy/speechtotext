<template>
 <div>
  <h1>Speech based browser helper</h1>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Speech Detection</title>
</head>
<body>

  <div class="words" contenteditable>
  </div>
</body>
<div id="add-url">
  <h3>Add favourite url</h3>
  <form id="myForm">
    <label>How to call:</label>
    
    <input id="lkm" type="text" v-model.lazy="blog.title" required/>
    <label>Url:</label>
     <input type="text" v-model.lazy="blog.url" required/>
     <button v-on:click="post" type="button" class="btn btn-outline-success">Add</button>
  </form>
  </div>
</html>
 </div>
</template>


<script>
import {db} from '../db'
export default {
  firebase: {
    //HERE WHERE OUR JSON FROM FIREBASE HAS BEEN SAVED
    blogs: db.ref("blogs")
  },
  data(){
    return{
      blog:{
        title:"",
        url:"",
        id:"",
        fetchedBlogs:""
      },
      submitted: false,
    }
  },
  methods: {
      //SEND URL AND TITLE TO THE FIREBASE USING VUEFIRE
      post: function(){
      this.$firebaseRefs.blogs.push({
        title: this.blog.title,
        url: this.blog.url
      }).then(function(data){
        console.log(data);
        document.getElementById("myForm").reset();
        alert("The Url Added");
      });
}
  },

  mounted() {

  //DONT WORRY; JUST SPEECH TO TEXT API
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

      const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
      p.textContent = poopScript;

      if(transcript.toLowerCase().includes('refresh')){
         browser.tabs.reload();
      }

      if(transcript.toLowerCase().includes('vk')){
        window.open("https://vk.com/feed","test");
      }
      if(transcript.toLowerCase().includes('6')){
        window.open("https://instagram.com/","test1");
      }
      if(transcript.toLowerCase().includes('message to friend')){
        window.open("https://vk.com/im?sel=223940996","test2");
      }
      if(transcript.toLowerCase().includes('google docs')){
        window.open("https://docs.google.com/","test3");
      }
      if(transcript.toLowerCase().includes('google sheet')){
        window.open("https://docs.google.com/spreadsheets/","test4");
      }
       if(transcript.toLowerCase().includes('five')){
        window.open("https://github.com/","test5");
      }
       if(transcript.toLowerCase().includes('presentation')){
        window.open("https://docs.google.com/presentation/","test6");
      }
      
  });

  recognition.addEventListener('end', recognition.start);

  recognition.start();
  }
}
</script>


  <style>
    html {
      font-size: 10px;
    }
     h1 {
      margin-top: 50px;
   color: #FFFFFF;
   font-family: courier;
    text-shadow: 5px 5px 0 rgba(0,0,0,0.1);
    text-align: center;
 }
 h3 {
   font-family: courier;
   margin-left: 25%;
   padding: 10px;
 }
    body {
      background: #ffc600;
      font-family: 'helvetica neue';
      font-weight: 200;
      font-size: 20px;
    }
    #add-url{
    font-size: 17px;
    font-family: courier;
    margin-top: 30%;
    margin-left: 25%;  
    }

    .words {
      max-width: 500px;
      margin: 50px auto;
      background: white;
      border-radius: 5px;
      box-shadow: 10px 10px 0 rgba(0,0,0,0.1);
      padding: 1rem 2rem 1rem 5rem;
      background: -webkit-gradient(linear, 0 0, 0 100%, from(#d9eaf3), color-stop(4%, #fff)) 0 4px;
      background-size: 100% 3rem;
      position: relative;
      line-height: 3rem;
    }
    
    p {
      margin: 0 0 3rem;
    }
    .words:before {
      content: '';
     position: absolute;
      width: 4px;
      top: 0;
      left: 30px;
      bottom: 0;
      border: 1px solid;
      border-color: transparent #efe4e4;
    }
  </style>
