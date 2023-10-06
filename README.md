# DiscordBot
A multifunction discord bot. The bot offers moderation functions such as kicking and banning members
music functions for when people are in voice channels to enjoy some music, a fully functioning ticket
system with different categories depending on what issue the user has, announcements, polls & suggestions
and more! 
# How to install
1. Install Node.js. You can find it [here](https://nodejs.org/en/download): 
2. Once the Setup Wizard is finished, you can simply open a command prompt and type ``node -v`` and if installed correctly, 
the system should display the Node.js version installed on your system.
3. In order to run the bot, you have to install the packages required. Simply navigate to the folder directory in a command prompt eg: ``C:\Users\Administrator\Desktop\DiscordBot\``
   and run ``npm init --yes``.
4. In the same directory in the command prompt, type  ``node .`` to start the bot. You can do !help for a list of available commands and how to use them.
# Extra Stuff
Don't forget to create a .env file in the main directory in which you will store the bot token as well as the prefix. Example:

``DISCORD_TOKEN = YOUR_TOKEN_HERE``

``PREFIX = !``

You can also change the prefix to your desired one. 

- In the ticket.js as well as applications.js you can change the labels of the options in the ``MessageSelectMenu()`` to the ones you want to use for your server.

Also, make sure to change the URL of the gifs in the embed messages to the one that suits your preferences.

For any questions, please contact me in Discord ``@t1meless``.
