import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContractData } from '../types/contract';
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import { ContractPDF } from './ContractPDF';
import { format, parse } from 'date-fns';

const formatDate = (date: string) => {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
  return format(parsedDate, 'yyyy年MM月dd日');
};

const parseDate = (date: string) => {
  return parse(date, 'yyyy年MM月dd日', new Date()).toISOString().split('T')[0];
};

export const ContractForm = () => {
  const initialData: ContractData = {
    donor: {
      name: '',
      address: '',
    },
    donee: {
      name: '',
      address: '',
    },
    gifts: [{ description: '' }],
    specialTerms: '',
    contractDate: format(new Date(), 'yyyy年MM月dd日'),
  };

  const [data, setData] = useState<ContractData>(initialData);

  const handleChange = (field: keyof ContractData, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePersonChange = (person: 'donor' | 'donee', field: 'name' | 'address', value: string) => {
    setData((prev) => ({
      ...prev,
      [person]: {
        ...prev[person],
        [field]: value,
      },
    }));
  };

  const handleGiftChange = (index: number, value: string) => {
    setData((prev) => ({
      ...prev,
      gifts: prev.gifts.map((gift, i) => 
        i === index ? { description: value } : gift
      ),
    }));
  };

  const addGift = () => {
    setData((prev) => ({
      ...prev,
      gifts: [...prev.gifts, { description: '' }],
    }));
  };

  const removeGift = (index: number) => {
    setData((prev) => ({
      ...prev,
      gifts: prev.gifts.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contract-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedData = JSON.parse(e.target?.result as string);
          setData(loadedData);
        } catch (error) {
          alert('ファイルの読み込みに失敗しました。');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          贈与契約書作成
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">贈与者情報</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="氏名"
                value={data.donor.name}
                onChange={(e) => handlePersonChange('donor', 'name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="住所"
                value={data.donor.address}
                onChange={(e) => handlePersonChange('donor', 'address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">受贈者情報</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="氏名"
                value={data.donee.name}
                onChange={(e) => handlePersonChange('donee', 'name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="住所"
                value={data.donee.address}
                onChange={(e) => handlePersonChange('donee', 'address', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">贈与物件</Typography>
            </Grid>
            {data.gifts.map((gift, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ mr: 2 }}>
                      物件 {index + 1}
                    </Typography>
                    {index > 0 && (
                      <IconButton
                        color="error"
                        onClick={() => removeGift(index)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="物件の内容"
                    multiline
                    rows={3}
                    value={gift.description}
                    onChange={(e) => handleGiftChange(index, e.target.value)}
                  />
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                startIcon={<AddIcon />}
                onClick={addGift}
                variant="outlined"
              >
                物件を追加
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="契約日"
                value={data.contractDate}
                onChange={(e) => handleChange('contractDate', formatDate(parseDate(e.target.value)))}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="特約事項"
                multiline
                rows={3}
                value={data.specialTerms}
                onChange={(e) => handleChange('specialTerms', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  component="label"
                >
                  データを保存
                </Button>
                <Button
                  variant="contained"
                  component="label"
                >
                  データを読み込む
                  <input
                    type="file"
                    hidden
                    accept=".json"
                    onChange={handleLoad}
                  />
                </Button>
                <BlobProvider document={<ContractPDF data={data} />}>
                  {({ blob, url, loading }) => (
                    <Button
                      variant="contained"
                      disabled={loading}
                      onClick={() => {
                        if (url) {
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = 'contract.pdf';
                          link.click();
                        }
                      }}
                    >
                      {loading ? 'PDF生成中...' : 'PDFをダウンロード'}
                    </Button>
                  )}
                </BlobProvider>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}; 