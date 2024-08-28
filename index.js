// Toggle the visibility of the menu and change the menu icon
document.getElementById('menuButton').addEventListener('click', function () {
    let menu = document.getElementById('menu');
    let menuIcon = document.getElementById('menuIcon');
    menu.classList.toggle('max-h-0');
    menu.classList.toggle('max-h-screen');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark');
});

// Initialize dropdown menu and handle department section display
document.addEventListener('DOMContentLoaded', function () {
    const dropdownButton = document.getElementById('dropdownHoverButton');
    const dropdownMenu = document.getElementById('dropdownHover');
    const departmentSections = document.querySelectorAll('.department-section');

    // Function to hide all department sections
    function hideAllSections() {
        departmentSections.forEach(section => {
            section.classList.add('hidden');
        });
    }

    // Function to show the selected department section
    function showDepartmentSection(department) {
        hideAllSections();
        const sectionToShow = document.getElementById(`${department}-section`);
        if (sectionToShow) {
            sectionToShow.classList.remove('hidden');
        }
    }

    // Toggle dropdown menu visibility with animation
    dropdownButton.addEventListener('click', function () {
        if (dropdownMenu.classList.contains('hidden')) {
            dropdownMenu.classList.remove('hidden');
            dropdownMenu.style.opacity = 0;
            dropdownMenu.style.transform = 'translateY(-10px)';
            requestAnimationFrame(() => {
                dropdownMenu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                dropdownMenu.style.opacity = 1;
                dropdownMenu.style.transform = 'translateY(0)';
            });
        } else {
            dropdownMenu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            dropdownMenu.style.opacity = 0;
            dropdownMenu.style.transform = 'translateY(-10px)';
            dropdownMenu.addEventListener('transitionend', function () {
                dropdownMenu.classList.add('hidden');
            }, { once: true });
        }
    });

    // Handle click outside the dropdown to close it
    document.addEventListener('click', function (event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            dropdownMenu.style.opacity = 0;
            dropdownMenu.style.transform = 'translateY(-10px)';
            dropdownMenu.addEventListener('transitionend', function () {
                dropdownMenu.classList.add('hidden');
            }, { once: true });
        }
    });

    // Prevent event propagation when clicking inside the dropdown
    dropdownMenu.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Handle dropdown item click
    dropdownMenu.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const department = item.getAttribute('data-value');
            showDepartmentSection(department);
            dropdownButton.textContent = item.textContent.trim();
            dropdownMenu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            dropdownMenu.style.opacity = 0;
            dropdownMenu.style.transform = 'translateY(-10px)';
            dropdownMenu.addEventListener('transitionend', function () {
                dropdownMenu.classList.add('hidden');
            }, { once: true });
        });
    });

    // Set default visible section
    showDepartmentSection('cse');
});

// Initialize Flatpickr date picker
flatpickr("#dob", {
    dateFormat: "Y-m-d",
    theme: "light"
});

// // Toggle dropdown menu visibility
// document.getElementById('dropdownButton').addEventListener('click', function () {
//     var dropdownMenu = document.getElementById('dropdownMenu');
//     dropdownMenu.classList.toggle('hidden');
// });

//Navigate to the next section with smooth transition
function nextSection() {
    const currentSection = Array.from(document.querySelectorAll('.section')).find(section => !section.classList.contains('hidden'));
    const next = currentSection.nextElementSibling;
    if (next && next.classList.contains('section')&&   validation()) {
        currentSection.style.opacity = 0;
        currentSection.style.transform = 'translateX(-100%)';
        currentSection.addEventListener('transitionend', function() {
            currentSection.classList.add('hidden');
            next.style.opacity = 1;
            next.style.transform = 'translateX(0)';
            next.classList.remove('hidden');
            updateStepper(next.id);
        }, { once: true });

    }
}

// Navigate to the previous section with smooth transition
function prevSection() {
    const currentSection = Array.from(document.querySelectorAll('.section')).find(section => !section.classList.contains('hidden'));
    const prev = currentSection.previousElementSibling;
    if (prev && prev.classList.contains('section')) {
        currentSection.style.opacity = 0;
        currentSection.style.transform = 'translateX(100%)';
        currentSection.addEventListener('transitionend', function() {
            currentSection.classList.add('hidden');
            prev.style.opacity = 1;
            prev.style.transform = 'translateX(0)';
            prev.classList.remove('hidden');
            updateStepper(prev.id);
        }, { once: true });
    }
}

// Update the stepper based on the current section
function updateStepper(currentSectionId) {
    const stepMap = {
        'section-program': 0,
        'section-initiate': 1,
        'section-masters': 1,
        'section-basicinfo': 2,
        'section-education': 3,
        'section-address': 4,
        'section-confirmation': 5
    };
    const currentStepIndex = stepMap[currentSectionId];
    const steps = document.querySelectorAll('.stepper-step');
    steps.forEach((step, index) => {
        if (index < currentStepIndex) {
            step.classList.add('text-black', 'animate-pulse');
            step.querySelector('span').classList.add('bg-black', 'animate-pulse');
        } else if (index === currentStepIndex) {
            step.classList.add('text-black');
            step.querySelector('span').classList.add('bg-black', 'animate-pulse');
        } else {
            step.classList.remove('text-black', 'animate-pulse');
            step.querySelector('span').classList.remove('bg-black', 'animate-pulse');
        }
    });
    document.getElementById('prevBtn').style.display = (currentSectionId === 'section-program') ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = (currentSectionId === 'section-confirmation') ? 'none' : 'inline-block';
}

// Show a specific page (section)
function showPage(pageNumber) {
    document.querySelectorAll('.section').forEach(section => section.classList.add('hidden'));
    const pageId = `section-${pageNumber}`;
    document.getElementById(pageId).classList.remove('hidden');
    updateStepper(pageId);
}

// Function to show Emergency Information
function showEmergencyInfo(type) {
    const emergencyForm = document.getElementById('emergencyForm');
    const buttons = {
        'father': document.getElementById('fatherButtonEmergency'),
        'mother': document.getElementById('motherButtonEmergency'),
        'other': document.getElementById('otherButtonEmergency')
    };

    if (type === 'other') {
        emergencyForm.classList.remove('hidden');
        buttons['other'].classList.add('bg-blue-300');
    } else {
        emergencyForm.classList.add('hidden');
        if (buttons[type]) {
            buttons[type].classList.add('bg-blue-300');
        }
    }
    Object.keys(buttons).forEach(key => {
        if (key !== type) buttons[key].classList.remove('bg-blue-300');
    });
}

// Function to show Guardian Information
function showGuardianInfo(type) {
    const guardianForm = document.getElementById('guardianForm');
    const buttons = {
        'father': document.getElementById('fatherButtonGuardian'),
        'mother': document.getElementById('motherButtonGuardian'),
        'other': document.getElementById('otherButtonGuardian')
    };

    if (type === 'other') {
        guardianForm.classList.remove('hidden');
        buttons['other'].classList.add('bg-blue-300');
    } else {
        guardianForm.classList.add('hidden');
        if (buttons[type]) {
            buttons[type].classList.add('bg-blue-300');
        }
    }
    Object.keys(buttons).forEach(key => {
        if (key !== type) buttons[key].classList.remove('bg-blue-300');
    });
}

// Handle confirmation modal
document.getElementById('applyNowBtn').addEventListener('click', function () {
    document.getElementById('confirmationModal').classList.remove('hidden');
});

document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('confirmationModal').classList.add('hidden');
});

// Handle SEU ID section visibility
document.getElementById('isSEU').addEventListener('change', function () {
    const seuIdSection = document.getElementById('seuIdSection');
    const nonSEUSection = document.getElementById('nonSEUSection');
    if (this.value === 'yes') {
        seuIdSection.classList.remove('hidden');
        nonSEUSection.classList.add('hidden');
    } else {
        seuIdSection.classList.add('hidden');
        nonSEUSection.classList.remove('hidden');
    }
});

//validation start

// page 2 validatio


// Function to validate a single input field
function validateInputField(inputElement, errorElement, fieldName) {
    const value = inputElement.value.trim();

    //Mobile number
    if (fieldName === 'Mobile Number') {
        const mobilePattern = /^01[3-9]\d{8}$/;
        if (!mobilePattern.test(value)) {
            errorElement.textContent = `Please enter a valid number with 11 digits.`;
            errorElement.classList.remove('hidden');
            inputElement.classList.add('border-red-500');
            return false;
        }
    }

    // Email validation
    if (fieldName === 'Email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === '') {
            errorElement.textContent = `${fieldName} is required.`;
            errorElement.classList.remove('hidden');
            inputElement.classList.add('border-red-500');
            return false;
        } else if (!emailPattern.test(value)) {
            errorElement.textContent = `Please enter a valid ${fieldName} address.`;
            errorElement.classList.remove('hidden');
            inputElement.classList.add('border-red-500');
            return false;
        }
    }

    // empty field and negative number validation
    if (value === '') {

        errorElement.textContent = `${fieldName} is required.`;
        errorElement.classList.remove('hidden');
        inputElement.classList.add('border-red-500');

        return false;
    } else if (Number(value) < 0) {
        errorElement.textContent = `${fieldName} cannot be a negative number.`;
        errorElement.classList.remove('hidden');
        inputElement.classList.add('border-red-500');
        return false;
    } else {
        errorElement.textContent = ''; // Clear the error text
        errorElement.classList.add('hidden');
        inputElement.classList.remove('border-red-500');
        return true;
    }
}

// Function to validate all fields in the current section
function validateCurrentSection() {
    const currentSection = Array.from(document.querySelectorAll('.section')).find(section => !section.classList.contains('hidden'));

    if (!currentSection) {
        return true;
    }

    const formId = currentSection.querySelector('form') ? currentSection.querySelector('form').id : null;
    let isValid = true;

    if (formId === 'secondaryEducationForm') {
        // SSC Fields
        const rollNumberSSC = document.getElementById('rollNumberSSC');
        const rollNumberSSCError = document.getElementById('rollNumber1Error');
        const registrationNumberSSC = document.getElementById('registrationNumberSSC');
        const registrationNumberSSCError = document.getElementById('registrationNumber1Error');
        const passingYearSSC = document.getElementById('passingYearSSC');
        const passingYearSSCError = document.getElementById('passingYear1Error');
        const boardSC = document.getElementById('boardSC');
        const boardSCError = document.getElementById('board1Error');

        isValid &= validateInputField(rollNumberSSC, rollNumberSSCError, 'Roll Number');
        isValid &= validateInputField(registrationNumberSSC, registrationNumberSSCError, 'Registration Number');
        isValid &= validateInputField(passingYearSSC, passingYearSSCError, 'Passing Year');
        isValid &= validateInputField(boardSC, boardSCError, 'Board');

        // HSC Fields
        const rollNumberHSC = document.getElementById('rollNumberHSC');
        const rollNumberErrorHSC = document.getElementById('rollNumberErrorHSC');
        const registrationNumberHSC = document.getElementById('registrationNumberHSC');
        const registrationNumberError = document.getElementById('registrationNumberError');
        const passingYearHSC = document.getElementById('passingYearHSC');
        const passingYear2Error = document.getElementById('passingYear2Error');
        const boardHSC = document.getElementById('boardHSC');
        const boardError = document.getElementById('boardError');

        isValid &= validateInputField(rollNumberHSC, rollNumberErrorHSC, 'Roll Number');
        isValid &= validateInputField(registrationNumberHSC, registrationNumberError, 'Registration Number');
        isValid &= validateInputField(passingYearHSC, passingYear2Error, 'Passing Year');
        isValid &= validateInputField(boardHSC, boardError, 'Board');
    }

    //3rd page validation

  if(formId=='personalInfoForm')
  {
      const nidInput = document.getElementById('nid-s' )
      const nidError = document.getElementById('nidError');
      const BirthCertificate = document.getElementById('birthCertificate')
      const BirthCertificateError = document.getElementById('birthCertificateError');
      const Passport = document.getElementById('passport-s')
      const PassportError = document.getElementById('passportError');
      const Email = document.getElementById('email')
      const EmailError = document.getElementById('emailError');
      const PmobileNumberInput = document.getElementById('mobileNumber-p');
      const PmobileNumberError = document.getElementById('mobileNumberError-p');
      isValid &= validateInputField(PmobileNumberInput,PmobileNumberError, 'Mobile Number');

//father into

      const fatherNameInput = document.getElementById('fatherName');
      const fatherNameError = document.getElementById('fatherNameError');
      const occupationInput = document.getElementById('occupation-f');
      const occupationError = document.getElementById('occupationError');
      const designationInput = document.getElementById('designation-f');
      const designationError = document.getElementById('designationError');
      const mobileNumberInput = document.getElementById('mobileNumber-f');
      const mobileNumberError = document.getElementById('mobileNumberError1');
      const NidF= document.getElementById('nid-f');
      const NidFError = document.getElementById('nid-f-Error');

      isValid &= validateInputField(NidF,NidFError, 'Nid');
      isValid &= validateInputField(fatherNameInput, fatherNameError, 'Father Name');
      isValid &= validateInputField(occupationInput, occupationError, 'Occupation');
      isValid &= validateInputField(designationInput, designationError, 'NID Number');
      isValid &= validateInputField(mobileNumberInput,mobileNumberError, 'Mobile Number');

      //mother info

      const motherNameInput = document.getElementById('motherName');
      const motherNameError = document.getElementById('motherNameError');
      const MoccupationInput= document.getElementById('occupation-m');
      const MoccupationError = document.getElementById('occupationError-m');
      const MdesignationInput = document.getElementById('designation-m');
      const MdesignationError = document.getElementById('designationError-m');
      const MmobileNumberInput = document.getElementById('mobileNumber-m');
      const MmobileNumberError = document.getElementById('mobileNumberError-m');
      const MNidF= document.getElementById('nid-m');
      const MNidFError = document.getElementById('nid-m-Error');


      isValid &= validateInputField(MNidF, MNidFError, 'Mother Occupation');
      isValid &= validateInputField(MmobileNumberInput, MmobileNumberError, 'Mobile Number');
      isValid &= validateInputField(MoccupationInput, MoccupationError, 'Mother Occupation');
      isValid &= validateInputField(MdesignationInput, MdesignationError, 'Mother Occupation');
      isValid &= validateInputField(motherNameInput,motherNameError, 'Nid');



      isValid &= validateInputField(Email,EmailError, 'Email');

      // Validate all fields

      // Check if at least one field is filled
      const isAnyFieldFilled = [nidInput,  BirthCertificate, Passport].some(field => field.value.trim() !== '' );

      if (!isAnyFieldFilled) {

          isValid &= validateInputField(Passport, PassportError, 'Passport');
          isValid &= validateInputField(BirthCertificate, BirthCertificateError, 'BirthCertificate');
          isValid &= validateInputField(nidInput, nidError, 'NID Number');
      }else {
          // Validate each field if any field is filled
          validateInputField(nidInput, nidError, 'NID Number');
          validateInputField(BirthCertificate, BirthCertificateError, 'Birth Certificate Number');
          validateInputField(Passport, PassportError, 'Passport Number');

          // Check if all fields are valid
          const isValid = [nidInput,BirthCertificate , Passport].every(field => field.value.trim() !== '');

          if (isValid) {

              // All fields are filled correctly; proceed with form submission or other actions
              console.log('Form is valid. Proceed with submission.');
              // For actual form submission, you might use form.submit() or another method
          } else {


              console.log('Form is one Field is valid. Please correct the errors.');
          }
      }

  }

    return isValid;
}

// Function to navigate to the next section with validation
function validation() {
    if (!validateCurrentSection()) {
        return; // Prevent navigation if validation fails
    }

    const currentSection = Array.from(document.querySelectorAll('.section')).find(section => !section.classList.contains('hidden'));
    const next = currentSection.nextElementSibling;

    if (next && next.classList.contains('section')) {
        currentSection.style.opacity = 0;
        currentSection.style.transform = 'translateX(-100%)';

        // Ensure the transition effect is applied
        setTimeout(() => {
            currentSection.classList.add('hidden');
            next.classList.remove('hidden');
            next.style.opacity = 1;
            next.style.transform = 'translateX(0)';
        }, 300); // Delay to match transition duration
    }
    updateStepper(next.id);
}

// Add event listeners to handle real-time validation
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        const errorElement = document.getElementById(`${input.id}Error`);
        const fieldName = input.getAttribute('data-field-name');
        validateInputField(input, errorElement, fieldName);
    });
});


