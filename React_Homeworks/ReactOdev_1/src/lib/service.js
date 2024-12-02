import axios from 'axios';

async function getData(Number){
    try{
    const { data : user} = await axios("https://jsonplaceholder.typicode.com/users/" + Number);
    const { data : post} = await axios("https://jsonplaceholder.typicode.com/posts?userId=" + Number);

    const post1 = post.filter(post => post.id === 1)
    console.log(user);
    console.log("posts:", post1);  
    }
    
    catch(e){
        console.error("Somethings wrong", e);
    }

}

export default getData;