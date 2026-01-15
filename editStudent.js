//let BASE_URL = `https://placementstracker-4.onrender.com/api`;
let urlId= new URLSearchParams(window.location.search)
let id = urlId.get("id")

let loadStudent= async()=>{
    let data= await fetch(`${BASE_URL}/students/${id}`);
    let student = await data.json();
    console.log(student.personal_info.full_name);
    studentName.value =  student.personal_info.full_name;
    studentGender.value = student.personal_info.gender;
    dob.value=student.personal_info.date_of_birth;
    profileimg.value=student.personal_info;
    collegeId.value = student.academic_info.college_id;


}
loadStudent();

let studentForm=document.getElementById("studentForm");

studentForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    // console.log(studentName.value);
    // console.log(studentGender.value);
    // console.log(PerformanceNavigationTiming.value.split(","));
    let student = {
        personal_info:{
            full_name:studentName.value,
            gender:studentGender.value,
            date_of_birth:dob.value,
            profile_image:profileimg.value,
        },
        academic_info:{
            college_id:collegeId.value,
            department: department.value,
            degree:degree.value,
            graduation_year: graduation.value,
            cgpa:cgpa.value,
            backlogs:backlogs.value,
        },
        skill:{
            programming:programing.value.split(","),
            databases:database.value.split(","),
            tools:tools.value.split(","),
        },
        placement_status: placementStatus.value,
    };
    console.log(student);
    await fetch(`https://placementstracker-4.onrender.com/api/students/${id}`,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(student),
    });
    alert("Student added Successfully")
    window.location.href = "../HTML/student.html";
});