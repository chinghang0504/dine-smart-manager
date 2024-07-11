import { useRef, useState } from 'react';
import './Tools.scss';
import QrCodeGenerator from '../../components/QrCodeGenerator/QrCodeGenerator';

function Tools() {
  const baseUrl = import.meta.env.VITE_QR_BASE_URL;
  const tableNum = 1;
  const [url, setUrl] = useState(`${baseUrl}${tableNum}`);
  const baseUrlRef = useRef(null);
  const tableNumRef = useRef(null);
  const qrCodeRef = useRef(null);

  // Change the base url or table number inputs
  function changeInput() {
    if (!tableNumRef.current.value) {
      tableNumRef.current.value = '1';
    }
    setUrl(`${baseUrlRef.current.value}${tableNumRef.current.value}`);
  }

  // Save the QR code
  function saveQr() {
    const canvas = qrCodeRef.current.querySelector('canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `qrcode_table_${tableNumRef.current.value}.png`;
    link.click();
  }

  // Print the QR code
  function printQr() {
    const canvas = qrCodeRef.current.querySelector('canvas');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <body>
          <img src="${canvas.toDataURL('image/png')}" onload="window.print();" />
        </body>
      </html>
    `);
    printWindow.document.close();
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
        <div ref={qrCodeRef}>
          <QrCodeGenerator url={url} />
        </div>

      </div>
      <div className='tools-action-container'>
        <button className='tools-action-container__button' onClick={saveQr}>Save</button>
        <button className='tools-action-container__button' onClick={printQr}>Print</button>
      </div>
    </div>

  )
}

export default Tools
