'use client';
import PropTypes from 'prop-types';

// @react
import { useCallback, useRef, useState } from 'react';

// @mui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// @project
import SvgIcon from '@/components/SvgIcon';
import useTranslation from '@/hooks/useTranslation';

/***************************  FILE UPLOAD  ***************************/

export default function FileUpload({ onFileSelect }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
        setFileName(files[0].name);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
      setFileName(files[0].name);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setFileName('');
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  if (fileName) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 2,
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: 4,
          bgcolor: 'primary.lighter'
        }}
      >
        <SvgIcon name="tabler-file-check" size={24} color="primary.main" />
        <Typography variant="body2" sx={{ color: 'primary.dark', fontWeight: 500, flex: 1, wordBreak: 'break-all' }}>
          {fileName}
        </Typography>
        <IconButton
          size="small"
          onClick={handleRemove}
          aria-label="Remove file"
          sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
        >
          <SvgIcon name="tabler-x" size={18} />
        </IconButton>
        <input ref={inputRef} type="file" hidden onChange={handleFileChange} />
      </Box>
    );
  }

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      sx={{
        border: '2px dashed',
        borderColor: isDragging ? theme.palette.primary.main : theme.palette.divider,
        borderRadius: '16px',
        p: 4,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
        '&:hover': {
          borderColor: theme.palette.primary.main
        }
      }}
    >
      <input ref={inputRef} id="file-upload-input" type="file" hidden onChange={handleFileChange} />
      <SvgIcon name="tabler-upload" size={48} sx={{ mb: 1, color: 'text.secondary' }} />
      <Typography variant="h6" sx={{ color: 'text.primary' }}>
        {t('forms.attachmentDrop')}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {t('forms.attachmentSize')}
      </Typography>
    </Box>
  );
}

FileUpload.propTypes = {
  onFileSelect: PropTypes.func.isRequired
};
