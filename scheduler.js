var mongoose = require("mongoose"),
    Reminder = require("./models/Reminder")
const { forEach } = require('p-iteration');
const accountSid = 'ACa622e2cf6b1da23dde447640d44f7d1f';
// ACe9ba7074c949da89aa56d3ded226762a
const authToken = '2648217cd317cddf2aeb380d0f6166ee';
// 1b780f7839610b395e010dc6560f9b8e
const client = require('twilio')(accountSid, authToken);

function scheduler(){
    var date = new Date(Date.now())
    
    Reminder.find({reminder_time:{$lt:date}})
     .then(async (allnews)=>{
        await forEach(allnews,async(news)=>{
            console.log("1233",news)

            
            client.messages
            .create({
               from: 'whatsapp:+14155238886',
               body: "Medicine Reminder for "+ news.medicine,
               to: 'whatsapp:+919716822108',
               mediaUrl:"https://www.researchgate.net/profile/Sandra_Benavides2/publication/228331607/figure/fig4/AS:667613038387209@1536182760366/Indicate-why-the-prescription-is-not-appropriate-as-written.png"
             })
            .then(message => {
                console.log(message)
                var post_date = new Date(news.reminder_time.getTime()+86400000);
                console.log(post_date)
                Reminder.findByIdAndUpdate(news._id,{reminder_time:post_date},{new: true})
                .then(updated=>{
                    console.log("schedule updated",updated)
                })
            })
            .catch(err=>{console.log(err)});
            // var local = {};
            // local.headline = news.headline;
            // local.description = news.description;
            // local.photo_download_url = news.photo_download_url;
            // local.author = news.author;
            // local.added_by = news.added_by;
            // local.tags = news.tags;
            // local.category = news.category;
            // local.isTop = news.isTop;
            // console.log(local)
            // News.create(local,async (err,added) => {
            //         if(err){
            //             console.log(err)
            //         }else{
            //             console.log("added a news: " + added._id)
            //             await Buffer.findByIdAndRemove(news._id).then(()=>{
            //                 console.log("News Deleted From Buffer Successfully")
            //               }).catch(err=> console.log(err))
            //         }
            //     })


        })
     })
}

module.exports = scheduler;