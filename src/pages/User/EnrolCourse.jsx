import { DataGrid } from '@mui/x-data-grid';
import { graduatedMenIcon, uniLogo } from '../../assets';
import { LuAlertOctagon } from 'react-icons/lu';
import Copyrights from '../../component/Footer/Copyrights';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { URLng } from '../../API/constant';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export default function EnrolCourse() {
  const [courses, setCourses] = useState([]);
  const [slectedCourses, SetSlectedCourses] = useState([]);
  const userToken = useSelector((state) => state.user.UserInfo?.token);

  const fetchCourses = async () => {
    try {
      const response = await axios.post(
        `${URLng}/showcoursesForDepartment`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setCourses(response.data);
      console.log(response.data);
      const res = await axios.post(
        `${URLng}/showcourses`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      SetSlectedCourses(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const enrrolCourse = async (id) => {
    try {
      const response = await axios.post(
        `${URLng}/courses/enroll`,
        { course_ids: [id] },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      Swal.fire('successful', `${response.data.message}`, 'success');
      fetchCourses(); // Update the course list after enrollment
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const unEnrrolCourse = async (id) => {
    try {
      const response = await axios.post(
        `${URLng}/courses/unenrollCourse`,
        { course_id: id },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      Swal.fire('successful', `${response.data.message}`, 'success');
      fetchCourses(); // Update the course list after unenrollment
    } catch (error) {
      console.error('Error unenrolling from course:', error);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchCourses();
    }
  }, [userToken]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'code', headerName: 'كود المادة', width: 130 },
    { field: 'name', headerName: 'اسم المادة', width: 130 },
    { field: 'hours', headerName: 'عدد الساعات', width: 130 },
    { field: 'material', headerName: 'الدرجة العظمي', width: 130 },
    { field: 'time', headerName: 'الدرجة الصغري', width: 130 },
    { field: 'chose', headerName: 'الدرجة الصغري', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginRight: 8 }}
          onClick={() => enrrolCourse(params.row.id)}
        >
          تسجيل
        </Button>
      ),
    },
  ];

  const columns2 = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'student_id', headerName: 'student_id', width: 130 },
    { field: 'course_id', headerName: 'course_id', width: 130 },
    { field: 'grade', headerName: 'grade', width: 130 },
    { field: 'firstOrSecond', headerName: 'firstOrSecond', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginRight: 8 }}
          onClick={() => unEnrrolCourse(params.row.course_id)}
        >
          الغاء التسجيل{' '}
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex bg-main items-center justify-around">
        <div>
          <img src={uniLogo} alt="" width={'100px'} height={'100px'} />
        </div>
        <div className="flex-1 text-center">
          <p className="text-lg md:text-3xl font-bold">
            جامعة بنهــــــــــــــا <br />
            تسجيل الكورسات ورؤية الكورسات المسجلة
          </p>
        </div>
        <div>
          <img src={graduatedMenIcon} alt="" width={'100px'} height={'100px'} />
        </div>
      </div>
      <div className="p-10 container mx-auto">
        <p className="font-bold text-sm my-3 flex items-center">
          <LuAlertOctagon className="mx-2" />
          برجاء استكمال البيانات التالية والتحقق من وضوحها وسلامتها لضمان وصولها
        </p>
        <div>
          <div style={{ height: 400, width: '100%', direction: 'ltr' }}>
            <DataGrid
              rows={courses}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </div>
        <div>
          <p className="font-bold text-3xl italic m-10">المواد المسجلة</p>
          <div
            className="my-3"
            style={{ height: 400, width: '100%', direction: 'ltr' }}
          >
            <DataGrid
              rows={slectedCourses}
              columns={columns2}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
      <div className="bg-main px-2">
        <Copyrights />
      </div>
    </div>
  );
}
