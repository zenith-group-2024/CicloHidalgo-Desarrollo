<!DOCTYPE html>
<html>
<head>
    <title>Restablecer Contraseña</title>
</head>
<body>
    <h1>Restablecer Contraseña</h1>

    <form action="{{ route('password.update') }}" method="POST">
        @csrf
        <input type="hidden" name="token" value="{{ $token }}">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <label for="email">Correo electrónico</label>
        <input type="email" name="email" required>

        <label for="password">Nueva Contraseña</label>
        <input type="password" name="password" required>

        <label for="password_confirmation">Confirmar Contraseña</label>
        <input type="password" name="password_confirmation" required>

        <button type="submit">Restablecer Contraseña</button>
    </form>
</body>
</html>
