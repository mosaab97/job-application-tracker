import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const JobForm = ({ open, onClose, onSubmit, initialData, error, jobsLoading }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      company_name: '',
      job_title: '',
      job_location: '',
      application_status: 'Applied',
      applied_date: '',
      interview_date: '',
      job_link: '',
      notes: ''
    }
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        applied_date: initialData.applied_date?.split('T')[0] || '',
        interview_date: initialData.interview_date?.split('T')[0] || ''
      });
    } else {
      reset({
        company_name: '',
        job_title: '',
        job_location: '',
        application_status: 'Applied',
        applied_date: '',
        interview_date: '',
        job_link: '',
        notes: ''
      });
    }
  }, [initialData, reset]);

  const statusOptions = ['Applied', 'Interviewing', 'Offered', 'Rejected'];

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {initialData ? 'Edit Application' : 'New Job Application'}
      </DialogTitle>
      {error && (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Row 1 */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Controller
                name="company_name"
                control={control}
                rules={{required: "Company name is required"}}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Name"
                    fullWidth
                    required
                    error={!!errors.company_name}
                    helperText={errors.company_name?.message}
                  />
                )}
              />
              <Controller
                name="job_title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Job Title"
                    fullWidth
                    required
                  />
                )}
              />
            </Box>

            {/* Row 2 */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Controller
                name="job_location"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Location"
                    fullWidth
                  />
                )}
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Controller
                  name="application_status"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Status" required>
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Box>

            {/* Row 3 */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Controller
                name="applied_date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Applied Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                )}
              />
              <Controller
                name="interview_date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Interview Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                )}
              />
            </Box>

            {/* Row 4 */}
            <Controller
              name="job_link"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Job Posting URL"
                  fullWidth
                />
              )}
            />

            {/* Row 5 */}
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Notes"
                  multiline
                  rows={4}
                  fullWidth
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={jobsLoading}
            >
            {jobsLoading ? <CircularProgress size={24} /> : (initialData ? 'Update' : 'Create')}
            </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default JobForm;