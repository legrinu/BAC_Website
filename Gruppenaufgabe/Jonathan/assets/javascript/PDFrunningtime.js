

let export_pdf = () => {
    var doc = new jsPDF()
    var male = document.getElementById("male").checked
    var female = document.getElementById("female").checked
    var other = document.getElementById("other").checked
    var fname = document.getElementById("fname").value
    var lname = document.getElementById("lname").value
    var email = document.getElementById("email").value
    var text_user = document.getElementById("text_user").value
    var gender

    if (!(male || female || other)){
        alert("Bitte geben Sie ein Geschlecht an")
        return
    }
    if (fname == ""){
        alert("Bitte geben Sie Ihren Vorname an")
        return
    }
    if (lname == ""){
        alert("Bitte geben Sie Ihren Nachnamen an")
        return
    }
    if (email == ""){
        alert("Bitte geben Sie eine E-Mail Adresse an")
        return
    }
    if (!email.includes("@")){
        alert("E-Mail muss ein @ beinhalten")
        return
    }
    if (!email.includes(".")){
        alert("E-Mail muss ein . beinhalten")
        return
    }
    if (text_user == ""){
        alert("Bitte geben Sie Ihr Anliegen ein")
        return
    }

    if (male){
        gender = "männlich"
    }
    else if (female){
        gender = "weiblich"
    }
    else if (other) {
        gender = "divers"
    }
    
    doc.text("Geschlecht: " + gender, 10, 10)
    doc.text("Vorname: " + fname, 10, 20)
    doc.text("Nachname: " + lname, 10, 30)
    doc.text("E-Mail: " + email, 10, 40)
    doc.text("Anfragetext: " + text_user, 10, 50)
    doc.save('Anfrage.pdf')
    document.getElementById("male").checked = false
    var female = document.getElementById("female").checked = false
    var other = document.getElementById("other").checked = false
    var fname = document.getElementById("fname").value =""
    var lname = document.getElementById("lname").value =""
    var email = document.getElementById("email").value =""
    var text_user = document.getElementById("text_user").value =""

}
