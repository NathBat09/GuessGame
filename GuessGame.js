let options = ["hairbrush","scissors","book","phone","ears","eyes","hammer","toothbrush","airplane","flashlight","elephant","tiger","lion","hair","basketball","baseball","spoon","guitar","happy","beach","football","photographer","drink","dinosaur","candle","rainbow","bicycle","telescope","microphone", "balloon","backpack","watermelon","umbrella","sandwich","crocodile","pancake","watch","cactus","helicopter","pizza","dolphin","lighthouse","butterfly","snowflake","ladybug","pineapple","coconut","mushroom", "feather", "whistle","chameleon","suitcase","pinecone","waterfall","zebra","galaxy","tornado","treasure","adventure","popcorn","giraffe","compass","seashell","fireworks","marshmallow","dragon","jellyfish","mosquito"];
let already = [];
let answer = options[Math.floor(Math.random()*options.length)];
console.log(answer);
let lines = "";
let word = "";
let letter = "";
let wordlimit = 3;
let letterlimit = 11;
const guessWord = document.querySelector("#guessWord");
const linesNumber = document.querySelector("#lines");
const answerWord = document.querySelector("#Word");
const timeDisplay = document.querySelector("#timeDisplay");
const start = document.querySelector("#start");
const play = document.querySelector("#play");
const startDisplay = document.getElementById('presentation')
const instDisplay = document.getElementById('instructions')
const winnerDisplay = document.getElementById('winner')
const loserDisplay = document.getElementById('loser')
const image = document.getElementById('beg');
const field = document.getElementById('guessField');
const gameDisplay = document.getElementById('gameContainer')
const detec = document.getElementById('detective')
const letterchances = document.getElementById('letterchances')
const wordchances = document.getElementById('wordchances')
gameDisplay.style.display = 'none';
winnerDisplay.style.display = 'none';
loserDisplay.style.display = 'none';
instDisplay.style.display = 'none';
detec.style.display = 'none';
//music
const correct = document.getElementById('correct')
const lose = document.getElementById('lose')
const theme = document.getElementById('theme')
const victory = document.getElementById('victory')
const wrong = document.getElementById('wrong')
const button = document.getElementById('button')
const regular = document.getElementById('regular')
const final = document.getElementById('final')
const pop = document.getElementById('pop')

theme.volume = 0.3;

regular.volume = 1;

let chars = [];
//timer
let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let mins = 0;
let secs = 0;
let intervalId;
paused = true;

for (let i = 0; i < answer.length; i++) {
    chars[i] = "_";
}

display(chars);

if(mins<1 && secs<30 && letterlimit > 0 && wordlimit > 0){

    start.addEventListener("click", () => {
        theme.play()
        button.play()
        button.currentTime = 0;
        startDisplay.style.display = 'none';
        gameDisplay.style.display = 'none';
        winnerDisplay.style.display = 'none';
        loserDisplay.style.display = 'none';
        instDisplay.style.display = 'block'
    })

    play.addEventListener("click", () => {
        button.play()
        button.currentTime = 0;
        gameDisplay.style.display = 'block'
        detec.style.display = 'block';
        instDisplay.style.display = 'none'
    })

    guessLetter.addEventListener("click", () => {
        regular.play()
        if(paused){
            paused = false;
            startTime = Date.now() - elapsedTime;
            intervalId = setInterval(updateTime, 1000);
        }
        letter = document.getElementById("guessField").value;
        letter = letter.toLowerCase();
        let letterGuess = false;
        if(letter.length == 1 && !already.includes(letter)){
            already.push(letter);
            letterchances.textContent = "CHANCES TO GUESS A LETTER: " + (letterlimit-1);
            letterlimit-=1;
            letterchances.textContent = "CHANCES TO GUESS A LETTER: " + (letterlimit-1);
            for(let i = 0; i<answer.length; i++){
                if(answer[i].toLowerCase()==letter){
                    console.log("sucess")
                    chars[i] = letter;
                    linesNumber.textContent = "RIGHT GUESS!";
                    correct.play();
                    correct.currentTime = 0; 
                    letterGuess = true;
                }
            }

            if(!letterGuess){
                linesNumber.textContent = "WRONG GUESS!";
                wrong.play();
                wrong.currentTime = 0;
            }
        } else if((letter.length == 1 && already.includes(letter))){
            linesNumber.textContent = "YOU ALREADY INTRODUCED THAT LETTER"
        } else if(letter.length > 1){
            linesNumber.textContent = "TOO LONG FOR A LETTER!";
        } else{
            linesNumber.textContent = "TYPE SOMETHING!";
        }

        display(chars);

        field.value = "";

        if (wordlimit <= 0 || letterlimit <= 0) {
            paused = true;
            linesNumber.textContent = "WE NEED THE PASSWORD!"
            regular.pause();
            final.pause();
            theme.pause();
            lose.play();
            loserDisplay.style.display = 'block';
            gameDisplay.style.display = 'none';
            elapsedTime = Date.now() - startTime;
            clearInterval(intervalId);
          }

    })

    guessWord.addEventListener("click", () => {
        word = document.getElementById("guessField").value;
        if(word.length==answer.length){
            wordchances.textContent = "CHANCES TO GUESS THE ANSWER: " + (wordlimit-1);
            wordlimit-=1;
            wordchances.textContent = "CHANCES TO GUESS THE ANSWER: " + (wordlimit-1);
        }
        if(word.toLowerCase() == answer.toLowerCase()){
            linesNumber.textContent = "WE NEED THE PASSWORD!"
            regular.pause();
            final.pause();
            theme.pause();
            victory.play();
            gameDisplay.style.display = 'none';
            winnerDisplay.style.display = 'block';
            elapsedTime = Date.now() - startTime;
            clearInterval(intervalId);
            for(let i = 0; i < answer.length; i++){
                chars[i] = answer[i];
            }
            display(chars);
        } else if(word.length > answer.length){
            linesNumber.textContent = "THE WORD IS TOO LONG! IT'S NOT THE ANSWER!"
        } else if(word.length < answer.length) {
            linesNumber.textContent = "THE WORD IS TOO SHORT! IT'S NOT THE ANSWER!"
        }else { 
            linesNumber.textContent = "WRONG GUESS!"
            wrong.play();
            wrong.currentTime = 0;
        }

        field.value = "";

        if (wordlimit <= 0 || letterlimit <= 0) {
            paused = true;
            linesNumber.textContent = "WE NEED THE PASSWORD!"
            regular.pause();
            theme.pause();
            final.pause();
            lose.play();
            loserDisplay.style.display = 'block';
            gameDisplay.style.display = 'none';
            elapsedTime = Date.now() - startTime;
            clearInterval(intervalId);
          }
    })

    hint.addEventListener("click", () => {
        if(mins >= 1){
            pop.play()
            pop.currentTime = 0;
            switch(answer){
                case "hairbrush":
                    linesNumber.textContent = "Hint: a brush for arranging or smoothing a person's hair";
                    break;
                case "scissors":
                    linesNumber.textContent = "Hint: an instrument used for cutting cloth, paper, and other thin material";
                    break;
                case "book":
                    linesNumber.textContent = "Hint: a set of printed sheets of paper that are held together inside a cover";
                    break; 
                case "phone":
                    linesNumber.textContent = "Hint: The phone is an electrical system that you use to talk to someone else in another place";
                    break; 
                case "ears":
                    linesNumber.textContent = "Hint: the organ of hearing and balance in humans and other vertebrates, especially the external part of this";
                    break;
                case "eyes":
                    linesNumber.textContent = "Hint: an organ that receives light and visual images";
                    break; 
                case "hammer":
                    linesNumber.textContent = "Hint: a tool with a heavy metal head mounted at right angles at the end of a handle";
                    break; 
                case "toothbrush":
                    linesNumber.textContent = "Hint: a small brush with a long handle, used for cleaning the teeth";
                    break; 
                case "airplane":
                    linesNumber.textContent = "Hint: a powered flying vehicle with fixed wings and a weight greater than that of the air it displaces";
                    break; 
                case "flashlight":
                    linesNumber.textContent = "Hint: a battery-operated portable light";
                    break; 
                case "elephant":
                    linesNumber.textContent = "Hint: a very large animal with a long, flexible nose called a trunk, which it uses to pick up things";
                    break; 
                case "tiger":
                    linesNumber.textContent = "Hint: a very large solitary cat with a yellow-brown coat striped with black";
                    break; 
                case "lion":
                    linesNumber.textContent = "Hint: a large wild animal of the cat family with yellowish-brown fur";
                    break; 
                case "hair":
                    linesNumber.textContent = "Hint: a covering for the body (or parts of it) consisting of a dense growth of threadlike structures";
                    break; 
                case "basketball":
                    linesNumber.textContent = "Hint: a game played between two teams of five players in which goals are scored by throwing a ball through a netted hoop";
                    break; 
                case "baseball":
                    linesNumber.textContent = "Hint: a ball game played between two teams of nine on a field with a diamond-shaped circuit of four bases";
                    break; 
                case "spoon":
                    linesNumber.textContent = "Hint: an implement consisting of a small, shallow oval or round bowl on a long handle, used for eating";
                    break; 
                case "guitar":
                    linesNumber.textContent = "Hint: a musical instrument, usually made of wood, with six strings and a long neck";
                    break;  
                case "happy":
                    linesNumber.textContent = "Hint: feeling or showing pleasure or contentment";
                    break; 
                case "beach":
                    linesNumber.textContent = "Hint: a strip of land covered with sand, pebbles, or small stones at the edge of a body of water";
                    break; 
                case "football":
                    linesNumber.textContent = "Hint: a game played by two teams of eleven players using a round ball";
                    break; 
                case "photographer":
                    linesNumber.textContent = "Hint: a person who takes photographs, especially as a job";
                    break; 
                case "drink":
                    linesNumber.textContent = "Hint: take (a liquid) into the mouth and swallow";
                    break;
                case "dinosaur":
                    linesNumber.textContent = "Hint: large reptiles which lived in prehistoric times";
                    break;
                case "candle":
                    linesNumber.textContent = "Hint: a cylindrical block of wax with a central wick that is lit to produce light as it burns";
                    break;
                case "rainbow":
                    linesNumber.textContent = "Hint: a meteorological phenomenon that is caused by reflection, refraction, and dispersion of light";
                    break;
                case "bicycle":
                    linesNumber.textContent = "Hint: a vehicle with two wheels that is propelled by human power";
                    break;
                case "telescope":
                    linesNumber.textContent = "Hint: an optical instrument used for viewing distant objects";
                    break;
                case "microphone":
                    linesNumber.textContent = "Hint: a device used to convert sound waves into electrical signals for amplification or recording";
                    break;
                case "balloon":
                    linesNumber.textContent = "Hint: a small, flexible bag that can be inflated with gas, usually used as decoration or for children to play with";
                    break;
                case "backpack":
                    linesNumber.textContent = "Hint: a bag that is carried on the back, usually made of fabric and used for carrying belongings";
                    break;
                case "watermelon":
                    linesNumber.textContent = "Hint: a large fruit with a green rind and juicy red or pink flesh";
                    break;
                case "umbrella":
                    linesNumber.textContent = "Hint: a device consisting of a circular canopy of cloth on a folding metal frame, used for protection against rain or sun";
                    break;
                case "sandwich":
                    linesNumber.textContent = "Hint: a food item consisting of two or more slices of bread with fillings between them";
                    break;
                case "crocodile":
                    linesNumber.textContent = "Hint: a large reptile with a long body, thick skin, and a snout, native to tropical regions";
                    break;
                case "pancake":
                    linesNumber.textContent = "Hint: a flat, thin cake made from batter and cooked on a hot surface";
                    break;
                case "watch":
                    linesNumber.textContent = "Hint: a small timepiece worn on the wrist";
                    break;
                case "cactus":
                    linesNumber.textContent = "Hint: a succulent plant with thick, fleshy stems and spines, typically found in dry areas";
                    break;
                case "helicopter":
                    linesNumber.textContent = "Hint: an aircraft with rotating blades that allow it to take off and land vertically";
                    break;
                case "pizza":
                    linesNumber.textContent = "Hint: a savory dish consisting of a round, flattened base of dough topped with tomato sauce, cheese, and various toppings";
                    break;
                case "dolphin":
                    linesNumber.textContent = "Hint: a marine mammal known for its intelligence and playful behavior";
                    break;
                case "lighthouse":
                    linesNumber.textContent = "Hint: a tower or structure equipped with a bright light to guide ships at sea";
                    break;
                case "butterfly":
                    linesNumber.textContent = "Hint: an insect with large, often brightly colored wings";
                    break;
                case "snowflake":
                    linesNumber.textContent = "Hint: a unique ice crystal that forms in the atmosphere during snowfall";
                    break;
                case "ladybug":
                    linesNumber.textContent = "Hint: a small, round beetle with a brightly colored, spotted body";
                    break;
                case "pineapple":
                    linesNumber.textContent = "Hint: a tropical fruit with a spiky, rough exterior and sweet, juicy flesh";
                    break;
                case "coconut":
                    linesNumber.textContent = "Hint: a large brown fruit with a hard shell and sweet, white flesh and liquid inside";
                    break;
                case "mushroom":
                    linesNumber.textContent = "Hint: a fleshy, spore-bearing fungus, typically with a stalk and a cap";
                    break;
                case "feather":
                    linesNumber.textContent = "Hint: a light, flat structure that covers the body of a bird";
                    break;
                case "whistle":
                    linesNumber.textContent = "Hint: a small wind instrument that produces a high-pitched sound when blown";
                    break;
                case "chameleon":
                    linesNumber.textContent = "Hint: a lizard that can change its color to blend in with its surroundings";
                    break;
                case "suitcase":
                    linesNumber.textContent = "Hint: a rectangular piece of luggage used for carrying clothes and personal belongings";
                    break;
                case "pinecone":
                    linesNumber.textContent = "Hint: the woody, conical fruit of a pine tree, typically with scales that open to release seeds";
                    break;
                case "waterfall":
                    linesNumber.textContent = "Hint: a cascade of water falling from a height";
                    break;
                case "zebra":
                    linesNumber.textContent = "Hint: an African mammal known for its black and white striped coat";
                    break;
                case "galaxy":
                    linesNumber.textContent = "Hint: a system of millions or billions of stars, together with gas and dust, held together by gravitational attraction";
                    break;
                case "tornado":
                    linesNumber.textContent = "Hint: a violently rotating column of air that is in contact with both the surface of the earth and a cumulonimbus cloud";
                    break;
                case "treasure":
                    linesNumber.textContent = "Hint: a valuable collection of money, jewelry, or other valuable items";
                    break;
                case "adventure":
                    linesNumber.textContent = "Hint: an exciting or unusual experience, typically involving risk and unknown outcomes";
                    break;
                case "popcorn":
                    linesNumber.textContent = "Hint: a snack made from dried kernels that puff up and become light and fluffy when heated";
                    break;
                case "giraffe":
                    linesNumber.textContent = "Hint: a tall African mammal with a long neck and legs and a coat patterned with irregular patches";
                    break;
                case "compass":
                    linesNumber.textContent = "Hint: a device used for navigation that shows the direction of the magnetic north";
                    break;
                case "seashell":
                    linesNumber.textContent = "Hint: the hard protective outer layer of a marine mollusk, often with an attractive spiral shape";
                    break;
                case "fireworks":
                    linesNumber.textContent = "Hint: a display of explosions and colors in the sky, typically used for celebration";
                    break;
                case "marshmallow":
                    linesNumber.textContent = "Hint: a soft, spongy confection made from sugar, gelatin, and flavorings";
                    break;
                case "dragon":
                    linesNumber.textContent = "Hint: a mythical creature typically depicted as a large, lizard-like animal with wings and the ability to breathe fire";
                    break;
                case "jellyfish":
                    linesNumber.textContent = "Hint: a gelatinous marine creature with long tentacles and a bell-shaped body";
                    break;
                case "mosquito":
                    linesNumber.textContent = "Hint: a small flying insect known for biting and sucking blood from humans and animals";
                    break;
                case "rainbow":
                    linesNumber.textContent = "Hint: a meteorological phenomenon that is caused by reflection, refraction, and dispersion of light";
                    break;    
            }
        } else{ 
            linesNumber.textContent = "It's too soon for a hint!";
        }

    })

    nextWord.addEventListener("click", () => {
        button.play()
        button.currentTime = 0;
        gameDisplay.style.display = 'block';
        winnerDisplay.style.display = 'none';
        loserDisplay.style.display = 'none';
        clearInterval(intervalId);
        startTime = 0;
        elapsedTime = 0;
        currentTime = 0;
        mins = 0;
        secs = 0;
        lines = "";
        word = "";
        letter = "";
        timeDisplay.textContent = "00:00";
        letterGuess = false;
        answer = options[Math.floor(Math.random()*options.length)];
        console.clear;
        console.log(answer);
        chars = [];
        paused = true;
        wordlimit = 3;
        letterlimit = 11;
        timeDisplay.style.color = "black";
        letterchances.textContent = "CHANCES TO GUESS A LETTER: 10";
        wordchances.textContent = "CHANCES TO GUESS THE ANSWER: 2";
        //music
        correct.pause()
        correct.currentTime = 0;

        lose.pause()
        lose.currentTime = 0;
        
        theme.currentTime = 0;
        theme.play()

        victory.pause()
        victory.currentTime = 0;

        wrong.pause()
        wrong.currentTime = 0;

        button.pause()
        button.currentTime = 0;

        regular.pause()
        regular.currentTime = 0;

        final.pause()
        final.currentTime = 0;

        pop.pause()
        pop.currentTime = 0;

        for (let i = 0; i < answer.length; i++) {
            chars[i] = "_";
        }

        display(chars);

        already = [];
    });

    again.addEventListener("click", () => {
        button.play()
        button.currentTime = 0;
        gameDisplay.style.display = 'block';
        winnerDisplay.style.display = 'none';
        loserDisplay.style.display = 'none';
        clearInterval(intervalId);
        startTime = 0;
        elapsedTime = 0;
        currentTime = 0;
        mins = 0;
        secs = 0;
        lines = "";
        word = "";
        letter = "";
        timeDisplay.textContent = "00:00";
        letterGuess = false;
        answer = options[Math.floor(Math.random()*options.length)];
        console.clear;
        console.log(answer);
        chars = [];
        paused = true;
        wordlimit = 3;
        letterlimit = 11;
        timeDisplay.style.color = "black";
        letterchances.textContent = "CHANCES TO GUESS A LETTER: 10";
        wordchances.textContent = "CHANCES TO GUESS THE ANSWER: 2";
        //music
        correct.pause()
        correct.currentTime = 0;

        lose.pause()
        lose.currentTime = 0;
        
        theme.currentTime = 0;
        theme.play()

        victory.pause()
        victory.currentTime = 0;

        wrong.pause()
        wrong.currentTime = 0;

        button.pause()
        button.currentTime = 0;

        regular.pause()
        regular.currentTime = 0;

        final.pause()
        final.currentTime = 0;

        pop.pause()
        pop.currentTime = 0;

        for (let i = 0; i < answer.length; i++) {
            chars[i] = "_";
        }

        display(chars);

        already = [];
    });

}

function display(chars){
    let words = "";

    for (let i = 0; i<chars.length; i++){
        words+=" "+chars[i];
    }
    answerWord.textContent = words;

}

function updateTime(){
    elapsedTime = Date.now() - startTime;

    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);

    secs = pad(secs);
    mins = pad(mins);
    
    timeDisplay.textContent = `${mins}:${secs}`;
    if(mins>=1){
        timeDisplay.style.color = "red";
        regular.pause();
        final.play();
    }

    if((mins>=1 && secs>=30 || (letterlimit <= 0 && wordlimit <= 0)) && !paused){
        paused = true;
        linesNumber.textContent = "WE NEED THE PASSWORD!"
        regular.pause();
        theme.pause();
        final.pause();
        lose.play();
        loserDisplay.style.display = 'block';
        gameDisplay.style.display = 'none';
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }

    if (answer == chars.join("") && !paused){
            paused = true;
            linesNumber.textContent = "WE NEED THE PASSWORD!"
            regular.pause();
            theme.pause();
            final.pause();
            victory.play();
            elapsedTime = Date.now() - startTime;
            gameDisplay.style.display = 'none';
            winnerDisplay.style.display = 'block';
            clearInterval(intervalId);
    }
}

function pad(unit){
    return (("0") + unit).length > 2 ? unit : "0" + unit;
}
