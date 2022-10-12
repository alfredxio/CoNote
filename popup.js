window.onload=function(){
  var siteurl;
  var selectsite=null;

    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) 
    {

        siteurl= tabs[0].url;
        document.getElementById('clink').value = siteurl;
        const sites=["leet","geeksforgeeks","codechef","codeforces"];
        selectsite=
        siteurl.includes(sites[0])?"Leetcode":
        siteurl.includes(sites[1])?"Geeksforgeeks":
        siteurl.includes(sites[2])?"Codechef":
        siteurl.includes(sites[3])?"Codeforces":"INVALID";
    
    
        document.getElementById('site-identified').innerHTML = selectsite;

    });

    injector();

    var data={
      "selectsite":selectsite,
      "title":null,
      "difficulty":null,
      "link":null,
      "note":null
    } 

    chrome.storage.sync.get(['title','difficulty','link'], function(result) {
      data.title = result.title;
      data.difficulty = result.difficulty;
      data.link = result.link;

      
      document.getElementById('ctitle').value = data.title;
      document.getElementById('cdiff').value = data.difficulty;
    });



    var btn = document.getElementById('fetch');
    
    btn.addEventListener('click', async function() {
        
        
        injector();
        
        chrome.storage.sync.get(['title','difficulty','link'], function(result) {
            data.title = result.title;
            data.difficulty = result.difficulty;
            data.link = result.link;

            document.getElementById('ctitle').value = data.title;
            document.getElementById('cdiff').value = data.difficulty;
        });

            
        
        // await new Promise(r => setTimeout(r,300));    
        
        // document.getElementById('ctitle').value = data.title;
        // document.getElementById('cdiff').value = data.difficulty;
     
    });

    
    async function injector(){
        await chrome.tabs.query({ active: true, currentWindow: true },(tabs) => {
          console.log("target injected");
          chrome.scripting.executeScript(
            {
              target: { tabId: tabs[0].id },
              func:  fetchd,
              args: [selectsite]
            },
            () => {
              console.log("injection complete");
            }
          );
      });
    }


    function fetchd(selectsite) {
      console.log("doing");
      var x="";
      var y="";

      if(selectsite==="Leetcode"){
        x = document.querySelectorAll("[data-cy=question-title]")[0].textContent;
        y = document.querySelectorAll("[diff]")[0].textContent;
      }

      if(selectsite==="Geeksforgeeks"){
        x = document.querySelectorAll('div#scrollableDiv > div > div > div > div > h3')[0].textContent;
        y = document.querySelectorAll('div#scrollableDiv > div > div > div:nth-of-type(2) > span > strong')[0].textContent;
      }

      if(selectsite==="Codechef"){
        x = document.querySelectorAll('div#root > div > div > div > div > div > div:nth-of-type(2) > div > div > span')[0].textContent;
        y = document.querySelectorAll('div#root > div > div > div > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > div > span:nth-of-type(2)')[0].textContent;
      }

      if(selectsite==="Codeforces"){
        x = document.querySelectorAll("[class=title]")[0].textContent;
        y = document.querySelectorAll("[title=Difficulty]")[0].textContent;
      }

      
      var datas = {
        title: x,
        difficulty: y.trim(),
        link: window.location.href,
        //"solution":$("[class=CodeMirror-lines]").textContent,
      };

       chrome.storage.sync.set(datas, function () {
        console.log("Value is set to " + datas);
      });

      console.log("retreive in mains");
    }



    const scriptURL = 'https://script.google.com/macros/s/AKfycbzodPjUniWtWcR5gdv7eVvV7Kt2GFIAk5WWNIjbmoTwCExdjOXAhtC30JxKHPiFq9kBTQ/exec';


    
  


  var form = document.getElementById('sheetdb-form');
        form.addEventListener("submit", e => {
          e.preventDefault();
          fetch(form.action, {
              method : "POST",
              body: new FormData(document.getElementById("sheetdb-form")),
          }).then(
              response => response.json()
          ).then(
            // you can put any JS code here
            document.getElementById("save").innerHTML="DONE"

          );
        });
}




