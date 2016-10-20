inorder to run the application 
prerequisities required
java jdk,jre
python/nginx to host the files
chrome extension for avoiding cross origin resource scripting 
linux environment

how to run it 
after you are done installing the prerequisites
go to solr/bin folder and in command line run the following command
 ./solr start
this will run the application in port nummber 8983

then run the command 

pythonn -m SimpleHTTPServer <port number of your wish>

this will create two servers open your browser to see the page up and running

inorder to make queries you should have the chrome extension that will remove the cors header that will prevent the browser feom rendering it

please raise an issue if you have any problem running it 
