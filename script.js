const leagues = {

    ligue1: {

        name: "Ligue 1",

        teams: [
            {name:"PSG", points:0},
            {name:"Marseille", points:0},
            {name:"Monaco", points:0},
            {name:"Lyon", points:0},
            {name:"Lille", points:0},
            {name:"Nice", points:0}
        ],

        matches:[
            {home:"PSG", away:"Marseille", date:"08/08/2026", time:"21:00", h:null, a:null},
            {home:"Monaco", away:"Lyon", date:"09/08/2026", time:"17:00", h:null, a:null},
            {home:"Lille", away:"Nice", date:"10/08/2026", time:"20:45", h:null, a:null}
        ]

    },


    bundesliga: {

        name:"Bundesliga",

        teams:[
            {name:"Bayern Munich", points:0},
            {name:"Dortmund", points:0},
            {name:"Leverkusen", points:0},
            {name:"Leipzig", points:0},
            {name:"Stuttgart", points:0},
            {name:"Frankfurt", points:0}
        ],

        matches:[
            {home:"Bayern Munich",away:"Dortmund",date:"09/08/2026",time:"20:30",h:null,a:null},
            {home:"Leverkusen",away:"Leipzig",date:"10/08/2026",time:"18:30",h:null,a:null}
        ]

    },


    premier: {

        name:"Premier League",

        teams:[
            {name:"Manchester City",points:0},
            {name:"Liverpool",points:0},
            {name:"Arsenal",points:0},
            {name:"Chelsea",points:0},
            {name:"United",points:0},
            {name:"Tottenham",points:0}
        ],

        matches:[
            {home:"Manchester City",away:"Liverpool",date:"09/08/2026",time:"16:30",h:null,a:null},
            {home:"Arsenal",away:"Chelsea",date:"10/08/2026",time:"21:00",h:null,a:null}
        ]

    }

};



let currentLeague="ligue1";


const ranking = document.getElementById("ranking");
const calendar = document.getElementById("calendar");
const selector = document.getElementById("leagueSelect");



function loadLeague(){

    const league = leagues[currentLeague];


    ranking.innerHTML="";


    let sorted = [...league.teams].sort((a,b)=>b.points-a.points);


    sorted.forEach((team,index)=>{


        let zone="";


        if(index < 3){
            zone="🏆";
        }
        else if(index < 5){
            zone="🟦";
        }
        else{
            zone="⚪";
        }


        ranking.innerHTML += `

        <tr>

        <td>${zone} ${index+1}</td>

        <td>${team.name}</td>

        <td>0</td>

        <td>0</td>

        <td>0</td>

        <td>0</td>

        <td>${team.points}</td>


        </tr>

        `;


    });



    calendar.innerHTML="";


    league.matches.forEach((match,index)=>{


        calendar.innerHTML += `


        <div class="match">


        <div>

        <b>${match.home}</b>

        vs

        <b>${match.away}</b>

        <br>

        📅 ${match.date}

        ⏰ ${match.time}


        </div>



        <div class="score">


        <input type="number" id="home${index}" value="${match.h ?? 0}">


        -

        <input type="number" id="away${index}" value="${match.a ?? 0}">


        <button onclick="updateScore(${index})">

        OK

        </button>


        </div>



        </div>


        `;


    });


}



function updateScore(index){


    const league=leagues[currentLeague];

    const match=league.matches[index];


    let homeScore=
    Number(document.getElementById("home"+index).value);


    let awayScore=
    Number(document.getElementById("away"+index).value);



    match.h=homeScore;
    match.a=awayScore;



    calculatePoints();



    loadLeague();

}



function calculatePoints(){


    const league=leagues[currentLeague];


    league.teams.forEach(team=>{
        team.points=0;
    });



    league.matches.forEach(match=>{


        if(match.h===null) return;



        let home =
        league.teams.find(t=>t.name===match.home);


        let away =
        league.teams.find(t=>t.name===match.away);



        if(match.h > match.a){

            home.points +=3;

        }

        else if(match.h < match.a){

            away.points +=3;

        }

        else{

            home.points++;
            away.points++;

        }



    });



}




selector.addEventListener("change",()=>{


    currentLeague=selector.value;

    loadLeague();


});



loadLeague();
