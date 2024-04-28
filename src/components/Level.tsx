import React from 'react';

interface LevelData {
  id: string;
  name: string;
  level: number;
  idTransaction: string;
  commission: number;
}

interface Props{
  data: LevelData[];
  level: number;
}

interface AccData {
  id: string;
  name: string;
  commissions: number;
}

const LevelView = ({ data, level }: Props) => {
  const newData:AccData[] = data.reduce((acc: AccData[], curr) => {
    const existingUser: any = acc.find((item:AccData) => item.id === curr.id);
    if (existingUser) {
      existingUser.commissions += curr.commission;
    } else {
      acc.push({
        id: curr.id,
        name: curr.name,
        commissions: curr.commission
      });
    }
    return acc;
  }, []);
  
  return (
    <div className="mx-auto rounded-lg overflow-auto text-white w-60 h-60">
      <h2 className="text-center text-2xl font-bold py-4 bg-gray-900">Level {level}</h2>
        <div className="table-header flex bg-gray-800">
          <div className="header-item flex-1 py-2 text-center">Name</div>
          <div className="header-item flex-1 py-2 text-center">Commission</div>
        </div>
        <div className="table-body">
          {newData.map(participant => (
            <div key={participant.id} className="flex bg-gray-700">
              <div className="row-item flex-1 py-2 text-center">{participant.name}</div>
              <div className="row-item flex-1 py-2 text-center">${participant.commissions.toFixed(2)}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LevelView;
