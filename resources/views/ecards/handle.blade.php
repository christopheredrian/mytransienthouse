<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Greetings🎄🎇</title>
    <link href="https://fonts.googleapis.com/css?family=Gochi+Hand&display=swap" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <style>

        .container {
            font-family: 'Gochi Hand', cursive;
            font-size: 1.3em;
            line-height: 1.8em;
        }

        img {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>


<div class="container">
    <div style="width: 60%; margin: 15vh auto">
        <p>

            <span style="display: block; margin-bottom: 30px">{{$ecard->salutation}}</span>
            {!! $ecard->message !!}
        </p>
        <p style="display: block; margin-top: 30px; float: right">
            {!! $ecard->velediction !!}
        </p>
    </div>
</div>


</body>
</html>
