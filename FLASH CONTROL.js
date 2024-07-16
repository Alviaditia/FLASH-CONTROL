






//Called when application is started. 
function OnStart() 
{ 
    //Create a layout with objects vertically centered. 
    lay = app.CreateLayout( "linear", "VCenter,FillXY" ); 
 
    app.AddLayout( lay ); 
   

  reqUrl();
	callCam();
}    


function reqUrl() {
  // Set a timer to periodically check for updates
  setInterval(function() {
    SendRequest(link);
  }, 1000); // Check every 5 seconds (adjust as needed)

  // Perform the initial request
 var link = "https://alpi.my.id/tes/tes.php"
}


//Send an http get request. 
function SendRequest( url ) 
{ 
    var httpRequest = new XMLHttpRequest(); 
    httpRequest.onreadystatechange = function() { HandleReply(httpRequest); };   
    httpRequest.open("GET", url, true); 
    httpRequest.send(null);
  //  app.ShowProgress( "Loading..." ); 
} 

function HandleReply(httpRequest) {
    if (httpRequest.readyState == 4) {
        // Jika respon berhasil diterima
        if (httpRequest.status == 200) {
           var  message = httpRequest.responseText;

            try {
                // Parsing respon sebagai JSON
                const responseObject = JSON.parse(message);

                // Cek status led3
                if (responseObject.led3 === "NO") {
                 
                 //nyalakan senter
                    cam.SetFlash( true )
                   
                      
                }
                // Tangani status LED lainnya jika perlu (opsional)
            } catch (error) {
                console.error("Kesalahan parsing respon JSON:", error);
                // Tangani kesalahan parsing (opsional)
            }
        } else {
            app.Alert("Error: " + httpRequest.status + httpRequest.responseText);
        }    
    }
  //  app.HideProgress();
}






//Called when application is started.
function callCam()
{   
	   app.PreventScreenLock( true )
	//(Reduce to 'QVGA' resolution for performance reasons)
	cam = app.CreateCameraView( 0.004, 0.008, "QVGA" )
  cam.SetOnReady(  )
  cam.StartPreview()
	//Stop screen turning off.
    app.PreventScreenLock( true )

	//Create horizontal layout that fills the screen.
	lay = app.CreateLayout( "Linear", "Horizontall,FillXY" )
//	
	//(Reduce to 'QVGA' resolution for performance reasons)
	cam = app.CreateCameraView( 0.004, 0.008, "QVGA" )
  cam.SetOnReady( cam.StartPreview() )
	lay.AddChild( cam )  
	//Add main layout to app.
	app.AddLayout( lay )
	cam.StartPreview()
}