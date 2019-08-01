All commands are catagorized by groups. Each of the following sections is a group.

The syntax of the command usage is:

`Optional paramater: []`

`Required paramater: <>`

##Table Of Contents
- [Administration](#administration)
- [Botowners](#botowners)
- [Crime](#crime)
- [Gambling](#gambling)
- [Gangs](#gangs)
- [General](#general)
- [Items](#items)
- [Moderation](#moderation)
- [Owners](#owners)
- [Polls](#polls)
- [System](#system)

### Administration

These commands may only be used by a user with the set mod role with a permission level of 2 or the Administrator permission.

Command | Description | Usage
---------------- | --------------| -------
Addrank|Add a rank.|`$addrank <@role> <cashRequired>`
Removerank|Remove a rank role.|`$removerank <@role>`
Setmodlog|Sets the mod log channel.|`$setmodlog <#channel>`
Setmutedrole|Sets the muted role.|`$setmutedrole <@role>`
Setprefix|Sets the guild's prefix.|`$setprefix <prefix>`
Settop10|Sets the Top 10 role.|`$settop10 <@role>`
Settop25|Sets the Top 25 role.|`$settop25 <@role>`
Settop50|Sets the Top 50 role.|`$settop50 <@role>`

### Botowners

These commands may only be used by the owners of DEA.

Command | Description | Usage
---------------- | --------------| -------
Blacklist|Blacklists user from your server, but doesn't ban him.|`$blacklist [@user]`
Eval|Evalute JavaScript code.|`$eval <code>`
Unblacklist|Remove's blacklist on stated user.|`$unblacklist [@user]`
Updateuser|Update any user in the DEA database.|`$updateuser <@user> <guild> <update>`

### Crime

These commands are for crime.

Command | Description | Usage
---------------- | --------------| -------
Jump|Jump some trash for cash on the street.|`$jump`
Scam|Scam some noobs on the streets.|`$scam`
Steal|Hop the big guns and lick a store.|`$steal`

### Gambling

Gambling is fun kids.

Command | Description | Usage
---------------- | --------------| -------
25+|Roll 25.00 or higher on a 100.00 sided die to win 0.2X your bet.|`$25+ <bet>`
53x2|Roll 53.0 or higher on a 100.00 sided die to win your bet.|`$53x2 <bet>`
75+|Roll 75.00 or higher on a 100.00 sided die to win 2.6X your bet.|`$75+ <bet>`
99+|Roll 99.00 or higher on a 100.00 sided die to win 90X your bet.|`$99+ <bet>`

### Gangs

These commands are for gangs.

Command | Description | Usage
---------------- | --------------| -------
Changegangname|Changes your gang's name.|`$changegangname <gang name>`
Creategang|Create a gang.|`$creategang <gang name>`
Deposit|Deposit into a gangs wealth.|`$deposit <amount>`
Destroygang|Destroy your gang.|`$destroygang`
Findusergang|Finds a user's gang.|`$findusergang <@member>`
Gang|Finds a gang.|`$gang [gang]`
Joingang|Asks leader to join his gang.|`$joingang <gang>`
Kickgangmember|Kick's a member from your gang.|`$kickgangmember <@user>`
Leavegang|Leave's gang.|`$leavegang`
Raid|Raid another gang's money.|`$raid <amount> <gang>`
Transferleadership|Transfers leadership of your gang to another gang member.|`$transferleadership <@user>`
Withdraw|Withdraw money from your gang.|`$withdraw <amount>`

### General

These commands aren't used with money.

Command | Description | Usage
---------------- | --------------| -------
Addbounty|Add a bounty on a user in chat.|`$addbounty <bounty> <@member>`
Cash|View the wealth of anyone.|`$cash [@member]`
Ganglb|Richest Gangs.|`$ganglb`
Health|View the health of anyone.|`$health [@member]`
Leaderboards|View the richest Drug Traffickers.|`$leaderboards`
Modroles|View all mod roles in this guild.|`$modroles`
Rank|View the rank of anyone.|`$rank [@member]`
Ranks|View all ranks in this guild.|`$ranks`
Transfer|Transfer money to any member.|`$transfer <@member> <transfer>`
Wanted|View the most Targeted Drug Traffickers.|`$wanted`

### Items

These commands are for items.

Command | Description | Usage
---------------- | --------------| -------
Eat|Eat food in your inventory.|`$eat <item>`
Fish|Go fishing using items.|`$fish <item>`
Hunt|Go hunting using items.|`$hunt <item>`
Inv|See your inventory.|`$inv [@member]`
Item|Search for an item's information.|`$item <item>`
Openall|Open all of a kind of crate.|`$openall <item>`
Opencrate|Open a crate.|`$opencrate <item>`
Shoot|Shoot a user with specified gun.|`$shoot <@member> <item>`
Shop|Buy a crate.|`$shop <item> [amount]`
Stab|Stab a user with specified knife.|`$stab <@member> <item>`
Store|Display's the purchasable items within the shop.|`$store`
Suicide|Kill yourself.|`$suicide`
Trade|Trade items with someone.|`$trade <@member> <Exchange Amount> <Exchange Item> <Wanted Amount> <Wanted Item>`

### Moderation

These commands may only be used by a user with the set mod role with a permission level of 1 or the Administrator permission.

Command | Description | Usage
---------------- | --------------| -------
Ban|Swing the ban hammer on any member.|`$ban <@user> [reason]`
Clear|Clear up to 100 messages in any text channel.|`$clear <quantity> [reason]`
Kick|Kick any member.|`$kick <@member> [reason]`
Mute|Mute any member.|`$mute <@member> [quantity of hours] [reason]`
Unban|Lift the ban hammer on any member.|`$unban <user> [reason]`
Unmute|Unmute any member.|`$unmute <@member> [reason]`
Warn|Warn any member.|`$warn <@member> [reason]`

### Owners

These commands may only be used by a user with the set mod role with a permission level of 3 or the ownership of the server.

Command | Description | Usage
---------------- | --------------| -------
Addmodrole|Add a mod role.|`$addmodrole <@role> <permissionLevel>`
Configuremodrole|Add a mod role.|`$configuremodrole <@role> <permissionLevel>`
Deletegang|Delete's specified gang within your server.|`$deletegang <gang>`
Modifycash|Allows you to modify the cash of any member.|`$modifycash <amount> [@member]`
Modifyhealth|Allows you to modify the health of any member.|`$modifyhealth <amount> [@member]`
Modifyinv|Allows you to modify the inventory of any member.|`$modifyinv <amount> <item> [@member]`
Removemodrole|Remove a mod role.|`$removemodrole <@role>`
Reset|Resets all user data in your server.|`$reset`
Resetuser|Reset any member's data.|`$resetuser [@member]`
Setglobalmultiplier|Sets the global multiplier for money per message.|`$setglobalmultiplier <amount>`

### Polls

These commands are for polls.

Command | Description | Usage
---------------- | --------------| -------
Createpoll|Create a poll.|`$createpoll <poll name> <choices> [days to last] [elder only] [mods only]`
Poll|Finds a poll.|`$poll <poll>`
Polls|Finds all polls in server.|`$polls`
Removepoll|Destroy your poll.|`$removepoll <poll>`
Vote|Vote on a poll.|`$vote <poll> <choice>`

### System

These commands are the normal bot commands.

Command | Description | Usage
---------------- | --------------| -------
Bestcommands|Most used commands.|`$bestcommands`
Help|All command information.|`$help [command]`
Info|All the information about the cash system.|`$info`
Invite|Add Bot to your server.|`$invite`
Statistics|Statistics about this bot.|`$statistics`
Worstcommands|Least used commands.|`$worstcommands`
