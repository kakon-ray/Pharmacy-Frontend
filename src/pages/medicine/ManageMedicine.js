import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ManageMedicine = () => {
    return (
        <div className='container'>

            <div className='card p-3 rounded-0 border-0'>
                <div className='py-4 d-flex justify-content-between'>
                    <h2 className="text-secondary">Manage Medicine</h2>
                    <div>
                        <Link to="/medicine/add" className='btn btn-primary'> + Add Medicine</Link>
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageMedicine;