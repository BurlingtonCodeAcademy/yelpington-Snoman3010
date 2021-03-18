import { Link } from "react-router-dom";

function Nav(props){
    //convert id string to name string
    function cleanText(kabobString){
        let words = kabobString.split('-')
        words.forEach((word, index) => {
            let newWord = word[0].toUpperCase() + word.slice(1)
            //if statements to compensate for irregular apostrophes and capitalization
            if(newWord.endsWith('s')){
                newWord = newWord.slice(0, newWord.length - 1) + "'" + newWord[newWord.length -1]
            }
            if(newWord.endsWith('n')){
                newWord = newWord + "'"
            }
            if(newWord.charAt(2) === 'd'){
                newWord = newWord.slice(0,2) + newWord[2].toUpperCase() + newWord.slice(3)
            }
            words[index] = newWord;
        });
        return words.join(' ')
    }
    return(
        <div id="nav-bar">
            <Link className='nav-item' id='nav-home' to={"/"}><h4>Home</h4></Link>
            {props.restaurantList.map((restaurant, index) => {
                //map the list of restaurants to links for the nav bar while cleaning the display text to show the name
               return <Link className='nav-item' to={`/restaurant/${restaurant}`}><h4>{cleanText(restaurant)}</h4></Link>
            })}
        </div>
    )
}

export default Nav;