// ==========================================
// CINEWRAPPED V2
// ==========================================

let ratingsData = [];
let watchedData = [];
let diaryData = [];

// ==========================================
// LOAD CSV FILES
// ==========================================

Promise.all([
    loadCSV("ratings.csv"),
    loadCSV("watched.csv"),
    loadCSV("diary.csv")
])
.then(([ratings, watched, diary]) => {

    ratingsData = ratings;
    watchedData = watched;
    diaryData = diary;

    generateDashboard();

})
.catch(error => {

    console.error(
        "Error loading CSV files:",
        error
    );

});

// ==========================================

function loadCSV(path){

    return new Promise((resolve,reject)=>{

        Papa.parse(path,{

            download:true,

            header:true,

            skipEmptyLines:true,

            complete:(results)=>
                resolve(results.data),

            error:(err)=>
                reject(err)

        });

    });

}

// ==========================================
// MAIN
// ==========================================

function generateDashboard(){

    updateStats();

    createRatingChart();

    createYearChart();

    createMonthChart();

    showTopMovies();

    showRecentMovies();

    updateWrappedSection();
}

// ==========================================
// STATS
// ==========================================

function updateStats(){

    animateValue(
        "moviesWatched",
        watchedData.length
    );

    animateValue(
        "moviesRated",
        ratingsData.length
    );

    const ratings = ratingsData
        .map(movie =>
            parseFloat(movie.Rating)
        )
        .filter(r => !isNaN(r));

    const avg =
        ratings.reduce(
            (a,b)=>a+b,
            0
        ) / ratings.length;

    document
        .getElementById(
            "averageRating"
        )
        .textContent =
        avg.toFixed(2);

    document
        .getElementById(
            "favoriteDecade"
        )
        .textContent =
        getFavoriteDecade();

    document
        .getElementById(
            "rewatches"
        )
        .textContent =
        getRewatchCount();

    document
        .getElementById(
            "personality"
        )
        .textContent =
        getMoviePersonality();

    document
        .getElementById(
            "mostActiveYear"
        )
        .textContent =
        getMostActiveYear();

    document
        .getElementById(
            "mostActiveMonth"
        )
        .textContent =
        getMostActiveMonth();

    document
        .getElementById(
            "longestStreak"
        )
        .textContent =
        getLongestStreak() + "d";
}

// ==========================================
// ANIMATION
// ==========================================

function animateValue(id,end){

    const element =
        document.getElementById(id);

    let start = 0;

    const duration = 1200;

    const stepTime =
        Math.abs(
            Math.floor(
                duration/end
            )
        );

    const timer =
        setInterval(()=>{

            start++;

            element.textContent =
                start;

            if(start >= end){

                clearInterval(timer);

                element.textContent =
                    end;
            }

        },stepTime);

}

// ==========================================
// FAVORITE DECADE
// ==========================================

function getFavoriteDecade(){

    const decades = {};

    watchedData.forEach(movie=>{

        const year =
            parseInt(movie.Year);

        if(!year) return;

        const decade =
            Math.floor(year/10)*10;

        decades[decade] =
            (decades[decade] || 0)+1;

    });

    return Object
        .keys(decades)
        .reduce((a,b)=>
            decades[a] >
            decades[b]
            ? a
            : b
        ) + "s";
}

// ==========================================
// REWATCH COUNT
// ==========================================

function getRewatchCount(){

    return diaryData.filter(movie=>

        movie.Rewatch &&
        movie.Rewatch.trim() !== ""

    ).length;
}

// ==========================================
// ACTIVE YEAR
// ==========================================

function getMostActiveYear(){

    const years = {};

    watchedData.forEach(movie=>{

        if(!movie.Date) return;

        const year =
            movie.Date.substring(0,4);

        years[year] =
            (years[year] || 0)+1;

    });

    return Object.keys(years)
        .reduce((a,b)=>

            years[a] >
            years[b]
            ? a
            : b
        );
}

// ==========================================
// ACTIVE MONTH
// ==========================================

function getMostActiveMonth(){

    const months = {};

    watchedData.forEach(movie=>{

        if(!movie.Date) return;

        const month =
            movie.Date.substring(0,7);

        months[month] =
            (months[month] || 0)+1;

    });

    return Object.keys(months)
        .reduce((a,b)=>

            months[a] >
            months[b]
            ? a
            : b
        );
}

// ==========================================
// LONGEST STREAK
// ==========================================

function getLongestStreak(){

    const dates = watchedData
        .map(movie=>movie.Date)
        .filter(Boolean)
        .sort();

    let longest = 1;
    let current = 1;

    for(let i=1;i<dates.length;i++){

        const prev =
            new Date(
                dates[i-1]
            );

        const curr =
            new Date(
                dates[i]
            );

        const diff =
            (curr-prev)
            /(1000*60*60*24);

        if(diff === 1){

            current++;

            longest =
                Math.max(
                    longest,
                    current
                );

        }else{

            current = 1;
        }
    }

    return longest;
}

// ==========================================
// PERSONALITY
// ==========================================

function getMoviePersonality(){

    const ratings = ratingsData
        .map(movie=>
            parseFloat(
                movie.Rating
            )
        )
        .filter(r=>
            !isNaN(r)
        );

    const avg =
        ratings.reduce(
            (a,b)=>a+b,
            0
        ) / ratings.length;

    if(avg >= 4.3)
        return "The Cinephile";

    if(avg >= 4.0)
        return "The Explorer";

    if(avg >= 3.5)
        return "The Strategist";

    if(avg >= 3.0)
        return "The Critic";

    return "The Realist";
}

// ==========================================
// WRAPPED
// ==========================================

function updateWrappedSection(){

    const personality =
        getMoviePersonality();

    document
        .getElementById(
            "wrappedPersonality"
        )
        .textContent =
        personality;

    const descriptions = {

        "The Cinephile":
        "You consistently engage with highly rated cinema and appreciate storytelling, craft and timeless classics.",

        "The Explorer":
        "You enjoy discovering a wide variety of films and rarely limit yourself to one style or decade.",

        "The Strategist":
        "You value narrative depth, strong structure and carefully crafted stories.",

        "The Critic":
        "You evaluate movies thoughtfully and reserve your highest ratings for exceptional experiences.",

        "The Realist":
        "You watch films with a balanced perspective and rate them according to genuine enjoyment."
    };

    document
        .getElementById(
            "wrappedDescription"
        )
        .textContent =
        descriptions[personality];
}

// ==========================================
// TOP MOVIES
// ==========================================

function showTopMovies(){

    const list =
        document.getElementById(
            "topMovies"
        );

    list.innerHTML = "";

    [...ratingsData]

    .sort((a,b)=>

        parseFloat(b.Rating) -
        parseFloat(a.Rating)

    )

    .slice(0,10)

    .forEach(movie=>{

        const li =
            document.createElement(
                "li"
            );

        li.textContent =
            `${movie.Name} (${movie.Rating}★)`;

        list.appendChild(li);

    });
}

// ==========================================
// RECENT MOVIES
// ==========================================

function showRecentMovies(){

    const list =
        document.getElementById(
            "recentMovies"
        );

    list.innerHTML = "";

    [...watchedData]

    .sort((a,b)=>

        new Date(b.Date) -
        new Date(a.Date)

    )

    .slice(0,10)

    .forEach(movie=>{

        const li =
            document.createElement(
                "li"
            );

        li.textContent =
            `${movie.Name} (${movie.Date})`;

        list.appendChild(li);

    });
}

// ==========================================
// CHARTS
// ==========================================

function createRatingChart() {

    const counts = {};

    ratingsData.forEach(movie => {

        const rating = parseFloat(movie.Rating);

        if (!isNaN(rating)) {
            counts[rating] =
                (counts[rating] || 0) + 1;
        }
    });

    const labels = Object.keys(counts)
        .map(Number)
        .sort((a, b) => a - b);

    new Chart(
        document.getElementById("ratingChart"),
        {
            type: "bar",

            data: {
                labels: labels,

                datasets: [{
                    label: "Movies",
                    data: labels.map(
                        rating => counts[rating]
                    ),

                    backgroundColor:
                        "rgba(56,189,248,0.7)",

                    borderColor:
                        "#38bdf8",

                    borderWidth: 1
                }]
            },

            options: {
                responsive: true,

                plugins: {
                    legend: {
                        display: false
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );
}

function createYearChart(){

    const years = {};

    watchedData.forEach(movie=>{

        years[movie.Year] =
            (years[movie.Year] || 0)+1;

    });

    const labels =
        Object.keys(years)
        .sort((a,b)=>a-b);

    new Chart(
        document.getElementById(
            "yearChart"
        ),
        {
            type:"line",

            data:{
                labels,

                datasets:[{
                    data:labels.map(
                        y=>years[y]
                    )
                }]
            }
        }
    );
}

function createMonthChart(){

    const months = {};

    watchedData.forEach(movie=>{

        if(!movie.Date) return;

        const month =
            movie.Date.substring(0,7);

        months[month] =
            (months[month] || 0)+1;

    });

    const labels =
        Object.keys(months)
        .sort();

    new Chart(
        document.getElementById(
            "monthChart"
        ),
        {
            type:"line",

            data:{
                labels,

                datasets:[{
                    data:labels.map(
                        m=>months[m]
                    )
                }]
            }
        }
    );
}