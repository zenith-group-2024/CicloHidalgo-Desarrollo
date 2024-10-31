<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>¡Bienvenido, {{ $user }}!</h1>
        <p>Gracias por registrarte con nosotros. Tu ID de usuario es: <strong>{{ $id }}</strong></p>
        <p>Tu código de verificación es: <strong>{{ $code }}</strong></p>
        <p>¡Estamos encantados de tenerte a bordo!</p>
    </div>
</body>
</html>