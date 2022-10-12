document.addEventListener('DOMContentLoaded', function() {
   
    const txt=document.getElementsByTagName('textarea');
    // const bullet = "\u2022";
    var bull=document.getElementById("arrows").value;
    let bullet=JSON.parse(`["${bull}"]`)[0];
    console.log(bullet);
    let bulletWithSpace = `${bullet}`;
    const enter = 13;


    const sel=document.getElementsByTagName('select');
    sel[0].addEventListener("click", function() {
        bull=document.getElementById("arrows").value;
        bullet=JSON.parse(`["${bull}"]`)[0];
        bulletWithSpace = `${bullet}`;
        console.log("its me");
    });

    
    //resize
    txt[0].setAttribute("style", "height:" + (txt[0].scrollHeight) + "px;overflow-y:hidden;");
    txt[0].addEventListener("input", OnInput, false);


    txt[0].addEventListener('keyup', (event) => {
        
        const { keyCode, target } = event;
        const { selectionStart, value } = target;
        
        if (keyCode === enter) {
            console.log('a');
            target.value = [...value]
            .map((c, i) => i === selectionStart - 1
                ? `\n${bulletWithSpace}`
                : c
            )
            .join('');
            console.log(target.value);
            
            target.selectionStart = selectionStart+bulletWithSpace.length;
            target.selectionEnd = selectionStart+bulletWithSpace.length;
        }
        
        if (value[0] !== bullet) {
            target.value = `${bulletWithSpace}${value}`;
        }


    });

    function OnInput(event) {
        this.style.height = 0;
        this.style.height = (this.scrollHeight) + "px";
    }
});
