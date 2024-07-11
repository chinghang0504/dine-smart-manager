import './QrCodeGenerator.scss';
import QRCode from 'qrcode.react';

function QrCodeGenerator({ url }) {
    return (
        <div>
            <QRCode
                value={url}
                size={256}
                bgColor="#ffffff"
                fgColor="#000000"
                level="Q" />
        </div>
    )
}

export default QrCodeGenerator
