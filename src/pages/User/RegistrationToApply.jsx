import { graduatedMenIcon, uniLogo, cx, ifoPdf } from '../../assets';
import Copyrights from '../../component/Footer/copyrights';
import { useEffect, useState } from 'react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { LuAlertOctagon, LuDownloadCloud, LuUploadCloud } from 'react-icons/lu';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { registering } from '../../Redux/Slices/userStatusSlice';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { URLng } from '../../API/constant';

export default function RegistrationToApply() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const registered = useSelector((state) => state.user.reged);
  const [t] = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const validateForm = () => {
    let errors = {};
    // Check required fields for current step
    const requiredFields = {
      1: [
        'name',
        'english_name',
        'age',
        'SSN',
        'job',
        'religion',
        'phone',
        'gender',
        'marital_status',
        'email',
        'address',
        'department_id',
        'type',
      ],
      2: [
        'master_degree',
        'four_years_grades',
        // 'original_bachelors_degree',
        'BirthCertificate',
        'IDCardCopy',
        'RecruitmentPosition',
        'EmployerApproval',
        'personalImage',
        'superAccpet',
      ],
    };

    requiredFields[step].forEach((field) => {
      if (!formData[field]) {
        errors[field] = `${field} is required`;
      }
    });

    // Additional validations
    if (
      formData.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (formData.SSN.length !== 14) {
      errors.SSN = 'length must be 14 number';
    }

    if (!/^\d+$/.test(formData.SSN)) {
      errors.SSN = 'length must be number';
    }

    // // استخراج تاريخ الميلاد
    // let year = parseInt(formData.SSN.substring(1, 3), 10);
    // let month = parseInt(formData.SSN.substring(3, 5), 10);
    // let day = parseInt(formData.SSN.substring(5, 7), 10);

    // // تحديد القرن
    // let century = formData.SSN.charAt(0);
    // if (century === '2') {
    //   year += 1900;
    // } else if (century === '3') {
    //   year += 2000;
    // } else {
    //   errors.SSN = 'length must be valid number';
    // }

    // // التحقق من صحة التاريخ
    // let date = new Date(year, month - 1, day);
    // if (
    //   date.getFullYear() !== year ||
    //   date.getMonth() + 1 !== month ||
    //   date.getDate() !== day
    // ) {
    //   errors.SSN = 'No SSN with this value';
    // }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  // useEffect(() => {
  //   dispatch(registering(false));
  // }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      console.log(formDataToSend.entries());
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      const response = await axios.post(
        `${URLng}/auth/register`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setLoading(false);
      console.log(formDataToSend, response.data);
      Swal.fire('Success', 'Data uploaded successfully!', 'success');
      dispatch(registering(true));
    } catch (err) {
      setLoading(false);

      Swal.fire('Error', `${err.message}`, 'error');
      dispatch(registering(false));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };
  const Step1 = (
    <div className="min-h-full w-full ">
      <div>
        <fieldset className="border my-2 border-gray-600 p-3 ">
          <legend>اسم الطالب بالغة العربية</legend>
          <div className="inline-block  my-2">
            <label htmlFor="firstName" className="lableStyle   mx-5 ">
              اسم الطالب
            </label>
            <input type="text" className="inputStyle" id="firstName" />
          </div>
          <div className="inline-block my-2">
            <label htmlFor="" className="lableStyle mx-5  ">
              اسم الاب
            </label>
            <input type="text" className="inputStyle " />
          </div>
          <div className="inline-block my-2">
            <label htmlFor="" className="lableStyle mx-5  ">
              اسم الجد
            </label>
            <input type="text" className="inputStyle " />
          </div>
          <div className="inline-block my-2">
            <label htmlFor="" className="lableStyle mx-5  ">
              اللقب
            </label>
            <input type="text" className="inputStyle" />
          </div>
          <div className="flex items-center  my-2">
            <label htmlFor="" className="lableStyle  mx-5">
              الاسم بالكامل(*)
            </label>
            <input
              type="text"
              className="inputStyle flex-grow  "
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && (
              <div className="text-red-500  text-center">{formErrors.name}</div>
            )}
          </div>
        </fieldset>
      </div>
      <div>
        <fieldset className="border my-2 border-gray-600 p-3 ">
          <legend>اسم الطالب بالغة الإنجليزية</legend>

          <div className="inline-block my-2">
            <label htmlFor="" className="lableStyle mx-5 ">
              اسم الطالب
            </label>
            <input type="text" className="inputStyle" />
          </div>
          <div className="inline-block my-2">
            <label htmlFor="" className="lableStyle mx-5  ">
              اسم الاب
            </label>
            <input type="text" className="inputStyle " />
          </div>
          <div className="inline-block my-2">
            <label htmlFor="" className="lableStyle mx-5  ">
              اسم الجد
            </label>
            <input type="text" className="inputStyle " />
          </div>
          <div className="inline-block my-2">
            <label htmlFor="" className="lableStyle mx-5  ">
              اللقب
            </label>
            <input type="text" className="inputStyle" />
          </div>
          <div className="flex items-center  my-2">
            <label htmlFor="" className="lableStyle  mx-5">
              الاسم بالكامل(*)
            </label>
            <input
              type="text"
              className="inputStyle flex-grow  "
              name="english_name"
              value={formData.english_name}
              onChange={handleInputChange}
            />
            {formErrors.english_name && (
              <div className="text-red-500  text-center">
                {formErrors.english_name}
              </div>
            )}
          </div>
        </fieldset>
      </div>
      <div>
        <div className="inline-block my-2">
          <label htmlFor="" className="lableStyle mx-5  ">
            البريد الالكتروني (*){' '}
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="inputStyle text-sm"
            name="email"
            value={FormData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <div className="text-red-500  text-center   ">
              {formErrors.email}
            </div>
          )}
        </div>
        <div className="inline-block my-2">
          <label htmlFor="department_id" className="lableStyle mx-5 w-fit ">
            القسم المراد التسجيل فيه:(*)
          </label>
          <select
            name="department_id"
            className="inputStyle  text-center"
            id="department_id"
            onChange={handleInputChange}
            value={FormData.department_id}
          >
            <option value="1">IS</option>
            <option value="2">AI</option>
            <option value="3">CS</option>
            <option value="4">SC</option>
          </select>
          {formErrors.department_id && (
            <div className="text-red-500  text-center   ">
              {formErrors.department_id}
            </div>
          )}
        </div>
        <div className="inline-block my-2">
          <label htmlFor="" className="lableStyle mx-5  ">
            الجنسية:(*)
          </label>
          <select
            name="nationality"
            className="inputStyle  text-center"
            id="Nationality"
            onChange={handleInputChange}
            value={formData.nationality}
          >
            <option value="مصري"> مصري </option>
            <option value="سعودي"> سعودي</option>
            <option value="اخري"> اخري</option>
          </select>
          {formErrors.nationality && (
            <div className="text-red-500  text-center   ">
              {formErrors.nationality}
            </div>
          )}
        </div>

        <div className="inline-block">
          <label htmlFor="IDNUM" className="lableStyle mx-5">
            الرقم القومي:(*)
          </label>
          <input
            type="text"
            id="IDNUM"
            className="inputStyle"
            name="SSN"
            value={FormData.SSN}
            onChange={handleInputChange}
          />
          {formErrors.SSN && (
            <div className="text-red-500  text-center   ">{formErrors.SSN}</div>
          )}
        </div>
        <div className=" inline-block pb-2">
          <label htmlFor="IDNUM" className="lableStyle mx-5">
            الديانة:
          </label>
          <select
            name="religion"
            className="inputStyle  text-center"
            id="Religion"
            value={FormData.religion}
            onChange={handleInputChange}
          >
            <option value="مسلم"> مسلم </option>
            <option value="مسيحي"> مسيحي</option>
            <option value="اخري"> اخري</option>
          </select>
          {formErrors.religion && (
            <div className="text-red-500  text-center   ">
              {formErrors.religion}
            </div>
          )}
        </div>

        <div className="inline-block my-2">
          <label htmlFor="maritalStatus" className="lableStyle mx-5  ">
            الحالة الاجتماعية
          </label>
          <select
            name="marital_status"
            className="inputStyle  text-center"
            id="maritalStatus"
            value={FormData.marital_status}
            onChange={handleInputChange}
          >
            <option value="single"> اعزب </option>
            <option value="married"> متزوج</option>
            <option value="divorce"> مطلق</option>
            <option value="other"> اخري</option>
          </select>
          {formErrors.marital_status && (
            <div className="text-red-500  text-center   ">
              {formErrors.marital_status}
            </div>
          )}
        </div>
        <div className="inline-block my-2">
          <label htmlFor="gender" className="lableStyle mx-5  ">
            النوع
          </label>
          <select
            name="gender"
            className="inputStyle  text-center"
            id="gender"
            onChange={handleInputChange}
            value={FormData.gender}
          >
            <option value="male"> ذكر </option>
            <option value="female"> انثي</option>
          </select>
          {formErrors.gender && (
            <div className="text-red-500  text-center   ">
              {formErrors.gender}
            </div>
          )}
        </div>
        <div className="inline-block my-2">
          <label htmlFor="gender" className="lableStyle mx-5  ">
            معيد/غير ذلك
          </label>
          <select
            name="type"
            className="inputStyle  text-center"
            id="type"
            value={FormData.type}
            onChange={handleInputChange}
          >
            <option value="moed"> معيد </option>
            <option value="external"> خارجي</option>
            <option value="external"> غير ذلك</option>
          </select>
          {formErrors.type && (
            <div className="text-red-500  text-center   ">
              {formErrors.type}
            </div>
          )}
        </div>
        <div className="inline-block my-2">
          <label htmlFor="job" className="lableStyle mx-5  ">
            وظيفة الطالب
          </label>
          <input
            type="text"
            className="inputStyle"
            id="job"
            name="job"
            onChange={handleInputChange}
            value={FormData.job}
          />
          {formErrors.job && (
            <div className="text-red-500  text-center   ">{formErrors.job}</div>
          )}
        </div>
        <div className="inline-block my-2">
          <label htmlFor="address" className="lableStyle mx-5  ">
            العنوان (*)
          </label>
          <input
            type="text"
            className="inputStyle"
            id="address"
            name="address"
            onChange={handleInputChange}
            value={FormData.address}
          />
          {formErrors.address && (
            <div className="text-red-500  text-center   ">
              {formErrors.address}
            </div>
          )}
        </div>
        <div className="inline-block my-2">
          <label htmlFor="age" className="lableStyle mx-5  ">
            االعمر
          </label>
          <input
            type="number"
            className="inputStyle"
            id="age"
            name="age"
            onChange={handleInputChange}
            value={formData.age}
          />
          {formErrors.age && (
            <div className="text-red-500  text-center   ">{formErrors.age}</div>
          )}
        </div>
        <div className="inline-block my-2">
          <label htmlFor="maritalStatus" className="lableStyle mx-5  ">
            المحمول (*){' '}
          </label>
          <input
            type="tel"
            className="inputStyle"
            id="GuardiaName"
            name="phone"
            value={FormData.phone}
            onChange={handleInputChange}
          />
          {formErrors.phone && (
            <div className="text-red-500  text-center   ">
              {formErrors.phone}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  const Step2 = (
    <div className="min-h-full w-full ">
      <div>
        <p className="font-bold text-sm mt-3 flex items-center  ">
          <LuAlertOctagon className="mx-2" />
          برجاء استكمال البيانات التالية والتحقق من وضوحها وسلامتها لضمان وصولها
          بشكل صحيح .
        </p>
      </div>
      <div>
        <div className="flex gap-5  justify-between my-5">
          <h1 className="text-2xl ">1- الاوراق والملفات المطلوبة </h1>
          <div className="flex w-1/6 items-center  gap-10">
            <a
              href={ifoPdf}
              download="reqFile"
              className="main-btn flex-1 flex items-center justify-center"
            >
              تنزيل
              <LuDownloadCloud />
            </a>
          </div>
        </div>
        <div className="flex gap-5 my-5  justify-between ">
          <h1 className="text-2xl">
            {' '}
            2- شهادة البكالوريوس(مؤقتة)العدد 1 اصل + صورة
          </h1>

          <div className="flex w-1/6 gap-10">
            <label
              className="main-btn flex flex-1 items-center justify-center gap-3"
              htmlFor="master_degree"
            >
              رفع
              <LuUploadCloud />
            </label>
            <input
              type="file"
              id="master_degree"
              className="hidden"
              name="master_degree"
              onChange={handleFileChange}
            />
            {formErrors.master_degree && (
              <div className="text-red-500  text-center   ">
                {formErrors.master_degree}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-5 my-5  justify-between ">
          <h1 className="text-2xl">
            {' '}
            3- شهادة تقديرات اربع سنوات دراسية العدد 1 اصل + صورة{' '}
          </h1>
          <div className="flex w-1/6 gap-10">
            <label
              className="main-btn flex flex-1 items-center justify-center gap-3"
              htmlFor="four_years_grades"
            >
              رفع
              <LuUploadCloud />
            </label>
            <input
              type="file"
              id="four_years_grades"
              className="hidden"
              name="four_years_grades"
              onChange={handleFileChange}
            />
          </div>
          {formErrors.four_years_grades && (
            <div className="text-red-500 text-center ">
              {formErrors.four_years_grades}
            </div>
          )}
        </div>
        <div className="flex gap-5 my-5  justify-between ">
          <h1 className="text-2xl">
            {' '}
            4. شهادة الماجستير(بالنسبة للقيد لدرجة الدكتوراة) العدد 1 اصل + صورة{' '}
          </h1>
          <div className="flex w-1/6 gap-10">
            <label
              className="main-btn flex flex-1 items-center justify-center gap-3"
              htmlFor="original_bachelors_degree"
            >
              رفع
              <LuUploadCloud />
            </label>
            <input
              type="file"
              id="original_bachelors_degree"
              className="hidden"
              name="original_bachelors_degree"
              onChange={handleFileChange}
            />
            {formErrors.original_bachelors_degree && (
              <div className="text-red-500 text-center ">
                {formErrors.original_bachelors_degree}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-5 my-5  justify-between ">
          <h1 className="text-2xl"> 5- شهادة الميلاد + صورة منها</h1>
          <div className="flex w-1/6 gap-10">
            <label
              className="main-btn flex flex-1 items-center justify-center gap-3"
              htmlFor="BirthCertificate"
            >
              رفع
              <LuUploadCloud />
            </label>
            <input
              type="file"
              id="BirthCertificate"
              className="hidden"
              name="BirthCertificate"
              onChange={handleFileChange}
            />
            {formErrors.BirthCertificate && (
              <div className="text-red-500 text-center ">
                {formErrors.BirthCertificate}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-5 my-5  justify-between ">
          <h1 className="text-2xl">6- صورة البطاقة الشخصية </h1>
          <div className="flex w-1/6 gap-10">
            <label
              className="main-btn flex flex-1 items-center justify-center gap-3"
              htmlFor="IDCardCopy"
            >
              رفع
              <LuUploadCloud />
            </label>
            <input
              type="file"
              id="IDCardCopy"
              className="hidden"
              name="IDCardCopy"
              onChange={handleFileChange}
            />
            {formErrors.IDCardCopy && (
              <div className="text-red-500 text-center ">
                {formErrors.IDCardCopy}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-5 my-5  justify-between ">
          <h1 className="text-2xl">7- الموقف التجنيدي للذكور + صورة منه </h1>
          <div className="flex w-1/6 gap-10">
            <label
              className="main-btn flex flex-1 items-center justify-center gap-3"
              htmlFor="RecruitmentPosition"
            >
              رفع
              <LuUploadCloud />
            </label>
            <input
              type="file"
              id="RecruitmentPosition"
              className="hidden"
              name="RecruitmentPosition"
              onChange={handleFileChange}
            />
            {formErrors.RecruitmentPosition && (
              <div className="text-red-500 text-center ">
                {formErrors.RecruitmentPosition}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-5 my-5  justify-between ">
          <h1 className="text-2xl ">8- موافقة جهة العمل + صورة منها </h1>
          <div className="flex w-1/6 gap-10">
            <label
              className="main-btn flex flex-1 items-center justify-center gap-3"
              htmlFor="EmployerApproval"
            >
              رفع
              <LuUploadCloud />
            </label>
            <input
              type="file"
              id="EmployerApproval"
              className="hidden"
              name="EmployerApproval"
              onChange={handleFileChange}
            />
            {formErrors.EmployerApproval && (
              <div className="text-red-500 text-center ">
                {formErrors.EmployerApproval}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-5 my-5  justify-between ">
          <h1 className="text-2xl">9- عدد 4 صورة شخصية 4*6</h1>
          <div className="flex w-1/6 gap-10">
            <label
              className="main-btn flex flex-1 items-center justify-center gap-3"
              htmlFor="Photograph"
            >
              رفع
              <LuUploadCloud />
            </label>
            <input
              type="file"
              id="Photograph"
              className="hidden "
              name="personalImage"
              onChange={handleFileChange}
            />
            {formErrors.personalImage && (
              <div className="text-red-500  text-center   ">
                {formErrors.personalImage}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-5 my-5  justify-between ">
          <h1 className="text-2xl">
            {' '}
            10- طلب قيد باسم الاستاذ الدكتور\وكيل الكلية للدراسات العليا والبحوث
          </h1>
          <div className="flex w-1/6 gap-1">
            <a
              href={cx}
              download="طلب قيد"
              className="main-btn flex-1 flex items-center justify-center gap-3"
            >
              تنزيل
              <LuDownloadCloud />
            </a>
            <label
              className="main-btn flex flex-1 items-center justify-center gap-3"
              htmlFor="superAccpet"
            >
              رفع
              <LuUploadCloud />
            </label>
            <input
              type="file"
              id="superAccpet"
              className="hidden "
              name="superAccpet"
              onChange={handleFileChange}
            />
            {formErrors.superAccpet && (
              <div className="text-red-500 text-center ">
                {formErrors.superAccpet}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  const Step3 = (
    <div className="min-h-full w-full ">
      <div>
        <p className="text-xl tracking-wider my-5 ">الاقرارات المطلوبة</p>
        <div className=" p-5 my-3">
          <input type="checkbox" className="mx-5  " id="e1" required />
          <label htmlFor="e1" className="font-semibold  ">
            اقر انا الطالب المتقدم للدرسة بالدرسات العليا بكلية الحاسبات والذكاء
            الاصطناعي جامعة بنها(ماجيستير/ دكتوراه) بانني لا اعمل بالقطاع
            الحكومي ولا قطاع الاعمال وهذا اقرار مني بذلك.
          </label>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className=" flex   flex-col bg-slate-100 items-center   min-h-screen">
        <ToastContainer />
        <div className="flex    w-full bg-main   items-center justify-around">
          <div>
            <img src={uniLogo} alt="" width={'100px'} height={'100px'} />
          </div>
          <div className="flex-1 text-center">
            <p className=" text-lg md:text-3xl   font-bold ">
              جامعة بنهــــــــــــــا <br />
              التسجيل للتقدم للدراسات العليا
            </p>
          </div>
          <div>
            <img
              src={graduatedMenIcon}
              alt=""
              width={'100px'}
              height={'100px'}
            />
          </div>
        </div>
        <div className="flex flex-1 items-center   container   min-w-3/4  py-5 justify-center   ">
          {registered ? (
            <div className="bg-white p-8 rounded shadow-md w-[50%]  text-center   ">
              {' '}
              <h2 className=" text-2xl text-green-600  font-bold mb-4      ">
                !Thank you for your registration
              </h2>{' '}
              <p className="text-gray-700">
                {' '}
                Registration has been completed successfully the data will be
                reviewed and approved or not
              </p>
            </div>
          ) : (
            <div className="bg-white p-0 md:p-6   w-[90%]  rounded-lg shadow-md  ">
              <h2 className="font-medium mb-4">خطوة {step} من 2</h2>
              <div className="flex mb-4">
                <div
                  className={`w-1/2 border-r border-gray-400 ${
                    step === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  } p-2 text-center cursor-pointer`}
                  onClick={() => setStep(1)}
                >
                  الخطوة 1
                </div>
                <div
                  className={`w-1/2 ${
                    step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  } p-2 text-center cursor-pointer`}
                  onClick={() => setStep(2)}
                >
                  الخطوة 2
                </div>
                <div
                  className={`w-1/2 ${
                    step === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  } p-2 text-center cursor-pointer`}
                  onClick={() => setStep(3)}
                >
                  الخطوة 3
                </div>
              </div>
              <div className=" border  h-full      rounded-md p-5  ">
                {step === 1 && Step1}
                {step === 2 && Step2}
                {step === 3 && Step3}
              </div>
              <div className="flex justify-between items-center mt-5">
                {step < 3 && (
                  <button
                    onClick={handleNext}
                    className={
                      step == 3
                        ? 'main-btn bg-gray-400 flex  justify-around items-center '
                        : 'main-btn flex  justify-around items-center'
                    }
                  >
                    Next
                    <IoArrowForward />
                  </button>
                )}

                {step === 3 && (
                  <button
                    onClick={handleSubmit}
                    className="main-btn flex  justify-around items-center"
                  >
                    Submit
                    <LuUploadCloud />
                  </button>
                )}
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className={
                    step === 1
                      ? 'main-btn bg-gray-400 flex  justify-around items-center '
                      : 'main-btn flex  justify-around items-center'
                  }
                >
                  Back
                  <IoArrowBack />
                </button>
              </div>
              {loading && <ClipLoader />}
              {error && <div className="error-message">{error}</div>}
            </div>
          )}
        </div>
        <div className="bg-main  w-full px-2  ">
          <Copyrights />
        </div>
      </div>
    </>
  );
}
