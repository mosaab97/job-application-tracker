import { useEffect, useState } from 'react';
import { 
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  CircularProgress,
  Box,
  Tooltip,
  Link,
  Button
} from '@mui/material';
import { Edit, Delete, Link as LinkIcon, Notes, Event, Work, Add } from '@mui/icons-material';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobsContext';
import JobForm from '../components/dashboard/JobForm';

const Dashboard = () => {
  const { user } = useAuth();
  const { 
    jobsLoading, 
    jobApplications, 
    getAllApplications,
    createApplication,
    updateApplication,
    deleteApplication 
  } = useJobs();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formOpen, setFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        await getAllApplications(user.id);
      } catch (err) {
        setError('Failed to fetch job applications');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchJobs();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const handleSubmit = async (data) => {
    try {
      const jobData = {
        ...data,
        user_id: user.id
      };
      
      let result = null;
      if (selectedJob) {
        result = await updateApplication(selectedJob.id, jobData);
      } else {
        result = await createApplication(jobData);
      }
      if(result) {
        await getAllApplications(user.id);
        setFormOpen(false);
      }
    } catch (error) {
      console.error('Operation failed:', error);
    }
  };

  const handleCreate = () => {
    setSelectedJob(null);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteApplication(id);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleEdit = (job) => {
    setSelectedJob({
      ...job,
      applied_date: job.applied_date?.split('T')[0] || '',
      interview_date: job.interview_date?.split('T')[0] || ''
    });
    setFormOpen(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth={false} 
      disableGutters
      sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        gap: 3,
        overflow: 'hidden'
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 'bold', 
        color: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <Work fontSize="large" /> Job Applications
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained" 
          onClick={handleCreate}
          startIcon={<Add />}
        >
          New Application
        </Button>
      </Box>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TableContainer 
          component={Paper} 
          elevation={3}
          sx={{ 
            height: '100%',
            overflow: 'auto',
            '&::-webkit-scrollbar': { width: '8px' },
            '&::-webkit-scrollbar-thumb': { bgcolor: 'divider' }
          }}
        >
          <Table stickyHeader sx={{ minWidth: 1200 }}>
            <TableHead sx={{ backgroundColor: 'background.paper' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Applied Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Interview Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Job Link</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Notes</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobApplications.map((app) => (
                <TableRow key={app.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{app.company_name}</TableCell>
                  <TableCell>{app.job_title}</TableCell>
                  <TableCell>{app.job_location}</TableCell>
                  <TableCell>
                    <Chip 
                      label={app.application_status}
                      color={getStatusColor(app.application_status)}
                      variant="outlined"
                      sx={{ minWidth: 100 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Event color="action" />
                      {formatDate(app.applied_date)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {app.interview_date ? (
                      <Box display="flex" alignItems="center" gap={1}>
                        <Event color="action" />
                        {formatDate(app.interview_date)}
                      </Box>
                    ) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {app.job_link ? (
                      <Link
                        href={app.job_link} 
                        target="_blank" 
                        rel="noopener"
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 0.5,
                          color: 'primary.main',
                          '&:hover': { textDecoration: 'none' }
                        }}
                      >
                        <LinkIcon fontSize="small" />
                        View Posting
                      </Link>
                    ) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Tooltip title={app.notes || 'No notes'} arrow>
                      <Box sx={{ 
                        maxWidth: 200, 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}>
                        <Notes fontSize="small" color="action" />
                        {app.notes || 'N/A'}
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(app)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(app.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {jobApplications.length === 0 && !loading && (
        <Typography variant="body1" sx={{ 
          mt: 2, 
          textAlign: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          No job applications found. Start adding some!
        </Typography>
      )}

      <JobForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedJob}
        error={error}
        loading={jobsLoading}
      />
    </Container>
  );
};

export default Dashboard;