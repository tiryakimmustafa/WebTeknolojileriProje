<?php
$email = $_POST['email'];
$password = $_POST['password'];

$parts = explode('@', $email);
$username = $parts[0]; // Örn: g231210074 veya b1812100002
$domain = isset($parts[1]) ? $parts[1] : '';

$student_number = $username; // Harfli haliyle tam olarak alınır

if ($domain === "sakarya.edu.tr" && $password === $student_number) {
    echo "<script>
        localStorage.setItem('student_number', '$student_number');
        window.location.href = 'hakkımda.html';
    </script>";
    exit();
} else {
    header("Location: giriş.html");
    exit();
}
?>
