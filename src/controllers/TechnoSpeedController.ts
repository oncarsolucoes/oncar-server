import {Request, Response} from 'express';
import apiTechno from '../services/apiTechno';

export default {
  async createPayer(request: Request, response: Response) {
    try {
      const data = await request.body;
			const payer = await apiTechno.post('/payer', data, {
				headers: {
				cnpjSh: process.env.TECHNOSPEED_CNPJ,
				tokenSh: process.env.TECTECHNOSPEED_TOKEN,
				payercpfcnpj: data.cpfCnpj,
			}
		});
    return response.status(201).json(payer);
  	} catch (err) {
			console.log(err)
    	return response.status(501).json({
				error: 'Falha interna, tente novamente'
			});
  	}
	},

	// async verifyPayer(request: Request, response: Response) {
  //   try {
	// 		const {cpfCnpj} = await request.query;

	// 		const payer = await apiTechno.get('/payer', {
	// 			headers: {
	// 			cnpjSh: process.env.TECHNOSPEED_CNPJ,
	// 			tokenSh: process.env.TECTECHNOSPEED_TOKEN,
	// 			payercpfcnpj: cpfCnpj,
	// 		}
	// 	});
  //   return response.status(200).json(payer.data);
  // 	} catch (err) {
  //   	console.log(err.response ? err.response : err);
  //   	return response.status(err.response.data.code).json({
	// 			error: err.response.data.message
	// 		});
  // 	}
  // }
};
