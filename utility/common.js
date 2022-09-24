export const formatResult = (result, status_code) => {
  let msg = "";
  if (status_code == 200) msg = "success";

  if (status_code == 500) msg = "failed";

  return {
    status: status_code,
    msg: msg,
    data: result,
  };
};

export const getCurrentTime = (getTimestamp = true) => {
  let current = new Date();
  let dd = current.getDate();
  let mm =
    current.getMonth() + 1 < 10
      ? `0${current.getMonth() + 1}`
      : current.getMonth() + 1;
  let yyyy = current.getFullYear();
  let h = current.getHours();
  let i = current.getMinutes();
  let s = current.getSeconds();
  if(getTimestamp) {
    return `${yyyy}-${mm}-${dd} ${h}:${i}:${s}`;
  }
  return `${yyyy}-${mm}-${dd}`;
}


export const dateIsValid = (dateInput) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (dateInput.match(regex) === null) {
    return false;
  }
  const date = new Date(dateInput);
  return date instanceof Date && !isNaN(date);
}

function uploadFile(file, uploadPath) {
    
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
  }

  file.mv(uploadPath, function(err){
      if(err) {
          return false;
      }
      return true;
  });
}


