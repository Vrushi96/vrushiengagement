
/* search.js Version 2.0 */

const CSV_FILE = "guests.csv";
let guests = [];

async function loadGuests() {
    try {
        const response = await fetch(CSV_FILE);
        const text = await response.text();

        const rows = text.trim().split(/\r?\n/);
        const headers = rows.shift().split(",");

        guests = rows.map(row => {
            const cols = row.split(",");
            return {
                first: cols[0]?.trim() || "",
                last: cols[1]?.trim() || "",
                table: cols[2]?.trim() || ""
            };
        });

        console.log(`${guests.length} guests loaded.`);
    } catch (err) {
        console.error(err);
    }
}

function renderSuggestions(matches){

    const box=document.getElementById("suggestions");
    if(!box) return;

    if(matches.length===0){
        box.style.display="none";
        box.innerHTML="";
        return;
    }

    box.innerHTML="";

    matches.slice(0,6).forEach(g=>{

        const item=document.createElement("div");
        item.className="suggestion-item";
        item.textContent=`${g.first} ${g.last}`;

        item.onclick=()=>{
            document.getElementById("search").value=item.textContent;
            box.style.display="none";
            showGuest(g);
        };

        box.appendChild(item);

    });

    box.style.display="block";
}

function showGuest(g){

    const results=document.getElementById("searchResults");

    results.innerHTML=`
<div class="result-card">
<div class="emoji">✨</div>

<h2>Welcome!</h2>

<h3>${g.first} ${g.last}</h3>

<p>We are so excited to celebrate with you.</p>

<h1>${g.table}</h1>

<p>Your Assigned Table</p>

<p>❤️ See you soon ❤️</p>

</div>
`;

    if(typeof launchConfetti==="function"){
        launchConfetti();
    }

}

function guestNotFound(){

    document.getElementById("searchResults").innerHTML=`
<div class="result-card not-found">

<h2>Guest Not Found</h2>

<p>

Please check the spelling of your name.

</p>

<p>

If you believe this is an error,

please contact Vrushali or Mahrshi.

</p>

</div>
`;

}

function searchGuests(){

    const query=document.getElementById("search").value.trim().toLowerCase();

    if(query===""){
        document.getElementById("searchResults").innerHTML="";
        renderSuggestions([]);
        return;
    }

    const matches=guests.filter(g=>{

        const full=`${g.first} ${g.last}`.toLowerCase();

        return g.first.toLowerCase().includes(query)
            || g.last.toLowerCase().includes(query)
            || full.includes(query);

    });

    renderSuggestions(matches);

    if(matches.length===1 &&
       (`${matches[0].first} ${matches[0].last}`.toLowerCase()===query
        || matches[0].first.toLowerCase()===query
        || matches[0].last.toLowerCase()===query)){
        showGuest(matches[0]);
    }

}

document.addEventListener("DOMContentLoaded",async()=>{

    await loadGuests();

    const input=document.getElementById("search");

    input.addEventListener("input",searchGuests);

    input.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            const q=input.value.trim().toLowerCase();

            const match=guests.find(g=>

                g.first.toLowerCase()===q ||

                g.last.toLowerCase()===q ||

                (`${g.first} ${g.last}`).toLowerCase()===q

            );

            if(match){

                showGuest(match);

            }else{

                guestNotFound();

            }

            document.getElementById("suggestions").style.display="none";

        }

    });

    document.addEventListener("click",(e)=>{

        if(!e.target.closest(".search-container")){

            const box=document.getElementById("suggestions");

            if(box) box.style.display="none";

        }

    });

});
