<div align="center">
    <a href="https://david-dm.org/Marathxnz/DEA2-Better"><img src="https://david-dm.org/Marathxnz/DEA2-Better.svg" alt="Dependencies" /></a>
</div>

# DEA
DEA is a multi-purpose Discord Bot mainly known for it's infamous Cash System with multiple subtleties referencing to the show Narcos, which inspired the creation of this masterpiece. You can get all the information related to commands by viewing the links below.

[Full documentation](https://marathxnz.github.io/DEA2-Better/)

[Add DEA to your Server](https://discordapp.com/api/oauth2/authorize?client_id=346848517186125834&scope=bot&permissions=8)

[Official Support Server](https://discord.gg/ATpswm8)
## DEA Cash System
One of the best ways to keep an engaging and active community running. This bot encourages chatting and helps form relationships between other users, bonding communities closer together.

The way this system works is quite simple, for every message that you send every 30 seconds that is at least 7 characters long, you will get $50.00.

If you are extra lucky, when sending messages you can win up to $10,000.00 in the lottery! The odds of winning the lottery are very low, but the more you chat, the higher chance you have of winning it!
## Moderation
DEA has one of the most detailed and efficient moderation systems. On top of features such as automatic unmutes and custom set moderator roles, there are moderation logs, to keep up with everything your mods are doing. Keep in mind these features are fully optional, and will not in anyway affect the functionality of the bot if they are not set.
## Self Hosting
First and foremost, you must download the files of this repository, and place them in a dedicated folder.

In order to host DEA, a connection to either a local or hosted MongoDB database is required as the large majority of the commands depends on the database storage. The best site for free MongoDB hosting with easy setup: https://mlab.com/. Simply sign up, create a single node database. Once the database is created, you must create a `Database User` in the database which will be used for the connection URL.

Once this is done, you must create a credentials.json file, with the following format:
```json
{
  "token": "enter bot token here",
  "ownerIds": ["290820869964431360"],
  "mongodbConnectionURL": "mongodb://dbUsername:dbPassword@ConnectionURL/DatabaseName"
}
```
The connection URL will be provided to you when viewing the database. All you need to do is create a `Database User` and fill in the blanks. This file must be placed in the `src` folder and will by default be gitignored, to prevent any accidental commits of your token.

Once this is done, follow the these steps:

1. Install the current node.js: https://nodejs.org/

2. Install git: https://git-scm.com/download/win
    
3. Open command prompt inside of the DEA folder: http://bit.ly/2uIXO4p
    
4. Enter `npm install --no-optional`
    
5. Enter `node src/index.js`
    
6. ENJOY!

# Credits
Most credit of this bot goes towards John, the coder/developer of the original DEA, if you want to contact him his Discord is John#0969