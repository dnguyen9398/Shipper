export const status1 = "Tạo mới"
export const status2 = "Đang chuyển"
export const status3 = "Đã nhận đơn hàng"
export const status4 = "Đã thanh toán"
export const status5 = "Cancel"
export const status6 = "Chờ giao"
export const status7 = "Hủy đơn hàng"
export const status8 = "Giao không thành công"
export const getStatus = (item) => {
    let status
    if(item.status == 1)
    {
        status = status1
    }
    else if(item.status == 2)
    {
        status = status2
    }
    else if(item.status == 3)
    {
        status = status3
    }
    else if(item.status == 4)
    {
        status = status4
    }
    else if(item.status == 5)
    {
        status = status5
    }
    else if(item.status == 6)
    {
        status = status6
    }
    else if(item.status == 7)
    {
        status = status7
    }
    else if(item.status == 8)
    {
        status = status8
    }
    return status
}