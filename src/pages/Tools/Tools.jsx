import { useRef, useState } from 'react';
import './Tools.scss';
import QrCodeGenerator from '../../components/QrCodeGenerator/QrCodeGenerator';

function Tools() {
  const baseUrl = "https://google.com/menu/";
  const tableNum = 1;
  const [url, setUrl] = useState(`${baseUrl}${tableNum}`);
  const baseUrlRef = useRef();
  const tableNumRef = useRef();

  function changeInput() {
    setUrl(`${baseUrlRef.current.value}${tableNumRef.current.value}`);
  }

  return (
    <div className='tools'>
      <div className='tools-header'>
        <h1 className='tools-header__title'>QR Code Generator</h1>
      </div>
      <div className='qr-code-generator'>
        <label className='qr-code-generator__label' htmlFor="base-url">Base URL</label>
        <input className='qr-code-generator__input' type='text' id='base-url' defaultValue={baseUrl} ref={baseUrlRef} onChange={changeInput} />
        <label className='qr-code-generator__label' htmlFor="table-num">Table Number</label>
        <input className='qr-code-generator__input qr-code-generator__input--table-num' type="number" id='table-num' min="1" defaultValue={tableNum} ref={tableNumRef} onChange={changeInput} />
        <QrCodeGenerator url={url} />
      </div>
    </div>

  )
}

export default Tools
