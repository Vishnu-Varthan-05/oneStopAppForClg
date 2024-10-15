  import React from 'react';
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  import { Table, Button, Popconfirm, message } from 'antd';
  import { DeleteOutlined } from '@ant-design/icons';
  import { fetchData, deleteData } from '../api';
  import './EditableTable.css';

  const DeletableTable = ({ type }) => {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
      queryKey: [type],
      queryFn: () => fetchData(`faculty/${type}`),
    });

    const deleteMutation = useMutation({
      mutationFn: ({ id }) => {
        const endpoint = type === 'competitions' ? 'competitions' : 'webevents';
        return deleteData(`faculty/${endpoint}`, id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([type]);
        message.success('Item deleted successfully');
      },
      onError: (error) => {
        message.error(`Delete failed: ${error.message}`);
      },
    });

    const handleDelete = (id) => {
      deleteMutation.mutate({ id });
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message || 'Something went wrong'}</div>;

    const columns = getColumns(type, handleDelete);

    return (
      <Table
        bordered
        dataSource={data?.data?.map(item => ({ ...item, key: item.id })) || []}
        columns={columns}
        rowClassName="deletable-row"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
        className="custom-table"
      />
    );
  };

  const getColumns = (type, handleDelete) => {
    const commonColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
      },
    ];

    const typeSpecificColumns = {
      webinars: [
        {
          title: 'Organiser',
          dataIndex: 'organiser',
          key: 'organiser',
        },
        {
          title: 'Conducted By',
          dataIndex: 'conductedBy',
          key: 'conductedBy',
        },
        {
          title: 'Venue',
          dataIndex: 'venue',
          key: 'venue',
        },
      ],
      events: [
        {
          title: 'Organiser',
          dataIndex: 'organiser',
          key: 'organiser',
        },
        {
          title: 'Conducted By',
          dataIndex: 'conductedBy',
          key: 'conductedBy',
        },
        {
          title: 'Venue',
          dataIndex: 'venue',
          key: 'venue',
        },
      ],
      competitions: [
        {
          title: 'Posted By',
          dataIndex: 'postedBy',
          key: 'postedBy',
        },
        {
          title: 'Hosted By',
          dataIndex: 'hostedby',
          key: 'hostedby',
        },
        {
          title: 'Importance Level',
          dataIndex: 'importancelvl',
          key: 'importancelvl',
        },
        {
          title: 'Registration Link',
          dataIndex: 'reglink',
          key: 'reglink',
          render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">Register</a>,
        },
      ],
    };

    const actionColumn = {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        record.can_edit === "true" ? (
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        ) : null
      ),
    };

    return [...commonColumns, ...typeSpecificColumns[type], actionColumn];
  };

  export default DeletableTable;