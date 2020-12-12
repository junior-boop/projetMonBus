export let editor = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>note</title>
    
    <style>
        body {
            margin: 0; padding: 0;
        }

        #corps {
            position: fixed;
            display: block;
            width: 100vw;
            height: calc(100% - 62px);
            box-sizing: border-box;
            overflow: scroll;
        }
        #header {
            display: flex;
            align-items: center;
            width: 100%;
            border-bottom: 1px solid rgba(236, 236, 236, 0.5);
        }
        .form > .titre{
            display: block;
            width: 304px;
            height: 55px;
            padding-left: 14px;
            border: none;
            font-size: 20px;
            font-weight: 600;
            color: rgb(44, 44, 44);
            box-sizing: border-box;
            background-color: rgb(243, 243, 243);
        }
        .close {
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            width: 56px;
            height: 55px;
            background-color: rgba(236, 236, 236, 0.5);
        }
        #content {
            width : 100%;
            box-sizing: border-box;
            overflow: scroll;
            padding: 14px;
        }
        #toolbar {
            position: fixed;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
            height: 48px;
            width: 100%;
            box-sizing: border-box;
            background-color: white;
            border-top: 1px solid rgba(236, 236, 236, 0.5);
        }
        .img {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            height: 32px;
            width: 32px;
        }

        .img > img {
            height: 28px;
        }
        .titre {
            background-color: #0099ba;
            /* background-color:  #1dd3fc; */
        }
        .nor {
            background-color: rgb(243, 243, 243) ;
        }
        .plus {
            background-color: rgb(243, 243, 243) ;
        }
        .save{
            width: 48px;
            height: 48px;
            border-radius: 1px;
            background-color:  rgb(243, 243, 243);
        }
        h3 {
            color: rgb(48, 48, 48);
            margin: 10px 0;
            font-size: 24px;
        }
        ul {
            margin: 5px 0;
            padding-left: 20px;
        }

        #overlay {
            position : fixed;
            display: none;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 50;
            opacity: 0;
            background-color: rgba(0, 0, 0, 0.4);
            transition: all ease-in-out 0.2s;
        }
        #menu1{
            position: fixed;
            display: none;
            bottom: -200px;
            width: 100%;
            height: 300px;
            opacity: 0;
            z-index: 100;
            border-radius: 10px 10px 0 0;
            background-color: white;
            transition: all ease-in-out 0.3s;
        }
        #search {
            padding: 10px 10px;
            width: 100%;
            min-height: 35px ;
        }
    </style>
</head>
<body>
    <div id = 'corps'>
       <div id="content"></div>
    </div>
    <script>

    </script>
</body>
</html>
`