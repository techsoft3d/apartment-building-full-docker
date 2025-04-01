var arboleda = ["a8dd6378-6509-495f-b63c-0cff0ac1b566",//arboleda full
"13d3d5d3-8387-41e5-9216-b7ddcce77c21", //Arboleda_Bldg-Plumb
"65b848ea-b801-42e3-a043-6f0be00fd621", //Arboleda_Bldg-Mech
"c8c1e020-fe14-4067-b360-4d0730559c6e", //Arboleda_Bldg-Elect
"6f887bce-4c56-4c01-9960-b05694cec2ad"//Arboleda_Bldg-Arch
] 



async function startViewer() {
        var viewer;
        let sessioninfo = await caasClient.getStreamingSession();
        await caasClient.enableStreamAccess(sessioninfo.sessionid, arboleda);
        
        viewer = new Communicator.WebViewer({
                containerId: "viewerContainer",
                endpointUri: sessioninfo.endpointUri,
                model: "ArboledaFull",
                enginePath: `https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@20${versionNumer}`,
                rendererType: 0
        });

        viewer.start();

        return viewer;

}

async function fetchVersionNumber() {
  let data = await caasClient.getHCVersion();
  versionNumer = data;        
  return data
}

async function initializeViewer() {
        var viewer = null;
    var ui = null;
    var INITIAL_CAMERA = {
      position: {
        x: -111038.50704000151,
        y: -50454.77499068544,
        z: 35699.247383553375,
      },
      target: {
        x: -44.93310546875,
        y: 5220.4443359375,
        z: 22040,
      },
      up: {
        x: 0.10243505924246869,
        y: 0.039640069717750984,
        z: 0.9939495578301567,
      },
      width: 70000,
      height: 70000,
      projection: 0,
      nearLimit: 0,
      cameraFlags: 0,
    };

    const models = ["Arboleda_Bldg"];


    var date = new Date();
    var start = date.getTime();

    viewer = await startViewer()

    viewer.setCallbacks({
      sceneReady: function () {
        viewer
          .getView()
          .setCamera(Communicator.Camera.fromJson(INITIAL_CAMERA));
        viewer.getView().setBackfacesVisible(true);

      },
      modelStructureReady: function () {
        var date = new Date();
        var end = date.getTime();
        viewer.view.setBackgroundColor(new Communicator.Color(0, 0, 0));

        console.log("Load time = " + (end - start) / 1000.0 + " seconds.");
      },
    });

    const uiConfig = {
      containerId: "content",
      screenConfiguration: Sample.screenConfiguration,
    };
    ui = new Communicator.Ui.Desktop.DesktopUi(viewer, uiConfig);


    window.onresize = function () {
      viewer.resizeCanvas();
    };

}