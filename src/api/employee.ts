import request from '../utils/request'

export const getEmployeeList = (params: any) =>
  request({
    url: `/admin/employee/page`,
    method: 'GET',
    params,
  })
