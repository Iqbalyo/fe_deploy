import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Img1 from '../../../../src/assets/images/no-avatar.svg';
import {
  Card,
  Icon,
  Image,
} from 'semantic-ui-react';
import './cardstyle.scss'; // Pastikan file SCSS benar-benar terhubung

const Carduser = () => {
  return (
    <div className="area-card">
      <Card fluid className="oke"> {/* Kelas kustom */}
        <Image src={Img1} wrapped ui={false} />
        <Card.Content className=''>
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className="date">Angkatan 2021</span>
          </Card.Meta>
          <Card.Description>
            NIM: 8030219888
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a href="#">
            <Icon name="user" />
           Lihat Detail
          </a>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Carduser;
