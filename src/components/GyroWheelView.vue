<template>
    <HeaderView />
    <br>
    <section style="min-height: 76vh;">
        <h2 class="mode-header">GyroWheel APP</h2>
        <p>The source code for GyroWheel APP is publicly available at <a
                href="https://github.com/serdarbsgn/gyrowheel">GitHub Repository</a></p>
        <article>
            <h3 class="mode-header"><strong>How to Install Windows Drivers</strong></h3>
            <p>There are multiple ways to install necessary software that establishes connection with the Android App.
            </p>
            <h1 class="mode-header"><strong>Using Exe files:</strong></h1>
            <p>Although downloading unknown .exe files can be risky, I can assure you that these files are safe and
                thoroughly tested.<br>
                But It's never bad to be safe than sorry on the internet, so I fully understand if you don't want to use
                them. <br>
                If you prefer a more transparent method, you can follow the steps below to use the source code
                directly.<br>
                <br>
                This app relies on the VigemBus driver to emulate a controller, so you need to first install it.<br>
                <a href="https://vigembusdriver.com/download/">Download VigemBus Driver</a><br><br>
                After installing the driver, you should download the correct exe file for your system, either x64 or x86
                version.<br>
                <a href="https://github.com/serdarbsgn/gyrowheel/tree/exe-files/dist">Download Exe Files</a><br><br>
                Click on the one your system is compatible with, and use the button on the right to download it in the
                next window.<br><br>


                And now, you should be able to open the executable file to see different methods of connecting your
                Windows machine and Android device.<br>
            </p>

            <h1 class="mode-header"><strong>Using python and downloading the source code:</strong></h1>

            <p>This method requires you to download python first, <a href="https://www.python.org/downloads/">Install
                    Python here</a><br><br>
                after this, you'll need to download the source code for the app,<br>
                <a href="https://github.com/serdarbsgn/gyrowheel/archive/refs/heads/main.zip">Here's the link for source
                    code in zip file.</a><br>
                <a href="https://github.com/serdarbsgn/gyrowheel/tree/main">Here's the link for source code in github,
                    if you prefer this way.</a><br><br>

                After installing Python, use the <code>install.bat</code> file to install the necessary libraries, the
                VigemBus driver, and its DLL files<br>

                And now, you should be able to open <code>run.bat</code> or <code>run-gui.bat</code> to see different
                methods of connecting your Windows machine and Android device.<br>
            </p>
        </article>
        <article>
            <h3 class="mode-header"><strong>How to Connect using Network Mode</strong></h3>
            <p>
                Select the "USE NETWORK" option in both Windows and Android devices and enter the IP address displayed
                in Windows app, into the first text field on your phone.<br>
                (If Windows app displays 192.168.1.42:12345 for example, you should enter 192.168.1.42 to text field on
                your phone.)<br>
                After correctly entering the IP displayed on your PC, use GyroWheel Mode, Gamepad Mode or Keyboard&Mouse
                mode. <br>

            </p>

            <h3 class="mode-header"><strong>How to Connect using Bluetooth Mode</strong></h3>
            <p>The Windows application attempts to find and display your computer's Bluetooth MAC address
                for easy entry in the phone app. If it fails to detect or finds multiple addresses, <br>
                you may need to enter or select the correct address manually.<br>

                To use Bluetooth mode, ensure Bluetooth permissions are granted, Bluetooth is enabled and that you have
                a Bluetooth-enabled computer. <br>
                Enter your PC’s MAC address (you can use the "SHOW BLUETOOTH COMPUTERS" button to get nearby MAC
                addresses). <br>
                Use the "CONNECT TO MAC ADDRESS" button to initiate the connection while the script is active on your
                computer.<br>

                Once connected, the GYROWHEEL MODE, GAMEPAD MODE and Keyboard&Mouse Mode buttons will light up for
                use.<br>
            </p>

            <p><strong>View <a href="https://serdarbisgin.com.tr/privacy-policy-for-gyrowheel-app">Privacy
                        Policy</a></strong></p>
        </article>
    </section>
    <br>
    <FooterView/>
</template>

<script>
import HeaderView from './HeaderView.vue';
import FooterView from './FooterView.vue';
export default {
  components: { HeaderView,FooterView },
}
</script>

<style>

.mode-header{
    font-size: x-large;
    color: azure;
}
</style>