export const runAuthSequence = async (setAuthState, setStatusText, setActionLabel, setGlyphText, addLog, wait) => {
    setAuthState('SCANNING');
    addLog("SEARCHING FOR FREQUENCY HARMONICS...");
    await wait(1500);

    setStatusText("SIGNAL DETECTED");
    setActionLabel("Cybertronian Signal Detected");
    setGlyphText("᚛ᚑᚚᚈᚔᚋᚒᚄ᚜");
    addLog(" CARRIER SIGNAL ISOLATED...");
    addLog(" ENERGON PULSE DETECTED: STABLE");
    await wait(1500);

    setActionLabel("Decrypting Signal...");
    setGlyphText("᚛ᚈᚏᚐᚅᚄᚃᚑᚏᚋ᚜");
    addLog(" ACCESSING IACON CRYPTO-CORE...");
    addLog(" ANALYZING SPARK FREQUENCY DATA...");
    await wait(2000);

    setAuthState('VERIFIED');
    setStatusText("IDENTITY CONFIRMED");
    setActionLabel("IDENTIFIED AS B-127\nNICKNAME : BUMBLEBEE");
    setGlyphText("᚛ᚁᚒᚋᚁᚂᚓᚁᚓᚓ᚜");
    addLog(" AUTHENTICATION SUCCESSFUL.");
    addLog(" ACCESS GRANTED. WELCOME BACK, SCOUT.");
};

export const redirectToHome = (addLog) => {
    addLog(" TERMINATING UPLINK...");
    addLog(" REDIRECTING TO DETAILS INTERFACE...");
    setTimeout(() => {
        window.location.href = "/iacon-portfolio";
    },0);
};