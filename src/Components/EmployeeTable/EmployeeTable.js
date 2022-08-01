import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { Modal } from 'antd';
import { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeesInitiate} from '../../Store/Actions';
import { Spin } from 'antd';
import './style.css'


const EmployeeUpdateForm = lazy(() => {
  return Promise.all([
    import("../EmployeeUpadeForm/EmployeeUpdateForm"),
    new Promise(resolve => setTimeout(resolve, 500))
  ])
    .then(([moduleExports]) => moduleExports);
});

const EmployeeDeleteModal = lazy(() => {
  return Promise.all([
    import("../EmployeeUpadeForm/EmployeeDeleteModal"),
    new Promise(resolve => setTimeout(resolve, 500))
  ])
    .then(([moduleExports]) => moduleExports);
});





const EmployeeTable = ({ refresh }) => {

  const { employees } = useSelector(state => state.data); 
  const [item, setItem] = useState("")
  const [modal1Visible, setModal1Visible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('edit');
  const dispatch = useDispatch()
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [tableFilter, setTableFilter] = useState([]);
  const [ workSpin, setWorkSpin ] = useState(true)
  
  const columns = [
    {
      title: 'Firstname',
      dataIndex: 'firstName',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastName',
    },
    {
      title: 'Username',
      dataIndex: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Actions',
      render: (item) => {
        return (
          <>
            <div className='actions'>
              <button className='edit bg-primary border-0 rounded text-light mx-2 px-3' onClick={(e) => {
                // console.log('-----edit');
                setItem(item);
                setModal1Visible(true)
                setModalTitle('edit')
              }}>Edit</button>
              <button className='delete bg-danger border-0 rounded text-light '
                onClick={(e) => {
                  // console.log('---delete');
                  setItem(item);
                  setModal1Visible(true)
                  setModalTitle('delete')
                }}>Delete</button>
            </div>
          </>
        )
      }
    },
  ];

  //THIS FETCHES THE DATA FROM THE DATABASE ONCE THE COMPONENT IS LOADED, RESPONSIBLE FOR PUSHING THE DATA INTO THE STATE
  useEffect(() => {
    setLoading(true)
    dispatch(getEmployeesInitiate(() => {
      setWorkSpin(false)
    }))
    setLoading(false)
  }, [refresh])

//THIS FETCHES THE DATA FROM THE DATABASE WHEN NOTHING IS BEING SEARCHED
  useEffect(() => {
    setDataSource(employees);
  }, [employees])


  //THIS IS FOR THE SEARCH OPERATION, WHEN VALUES ARE ENTERED INTOTHE SEARCH BAR
  useEffect(() => {
    filterData(value)
  }, [value, dataSource]);


  const start = () => {
    setLoading(true); // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };


  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const onCompleteUpdate = () => {
    setTimeout(()=> {
      setModal1Visible(false)
    }, 2000)
  }
  const onCompleteDelete = () => {
    setTimeout(()=> {
      setModal1Visible(false)
    }, 2000)
  }

  const filterData = (value) => {
   
    if (value != "") {
      const filterTable = dataSource.filter( o => Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      ));
      setTableFilter(filterTable)
    } else {           
      setTableFilter(dataSource);
    }

    // console.log({tableFilter});
  }

  return (
    <div className='mytable'>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Delete
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <div className="input-group input-group-lg">
        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder='Search for employee'
          value={value} onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className='tables '>
        <Spin size="large" spinning={workSpin}> <Table rowSelection={rowSelection}  columns={columns} dataSource={tableFilter} loading={loading} pagination={{
          pageSize: 8
        }}
        />
        </Spin>
      </div>
      <div >
        <Suspense fallback={<div></div>}>
          <Modal
            className='nomodal'
            style={{ top: 140 }}
            width={800}
            visible={modal1Visible}
            onOk={() => setModal1Visible(false)}
            onCancel={() => setModal1Visible(false)}
          >
            {modalTitle == 'edit' && <EmployeeUpdateForm onCompleteUpdate={onCompleteUpdate} refresh={refresh} item={item} />}
            {modalTitle == 'delete' && <EmployeeDeleteModal onCompleteDelete={onCompleteDelete} refresh={refresh} item={item} />}

          </Modal>
        </Suspense>
      </div>

    </div>

  );
};
export default EmployeeTable

