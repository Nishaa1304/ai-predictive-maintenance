"""
Base Agent Class
All specialized agents inherit from this base class
"""
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from datetime import datetime
import logging
from enum import Enum

class AgentStatus(Enum):
    IDLE = "idle"
    RUNNING = "running"
    ERROR = "error"
    BLOCKED = "blocked"

class AgentPriority(Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    CRITICAL = 4

class BaseAgent(ABC):
    """
    Base class for all AI agents in the system
    Provides common functionality for:
    - Logging
    - State management
    - Message handling
    - Error handling
    """
    
    def __init__(self, agent_id: str, agent_name: str):
        self.agent_id = agent_id
        self.agent_name = agent_name
        self.status = AgentStatus.IDLE
        self.created_at = datetime.now()
        self.last_activity = datetime.now()
        self.task_count = 0
        self.error_count = 0
        
        # Setup logging
        self.logger = logging.getLogger(f"agent.{agent_name}")
        self.logger.info(f"Agent {agent_name} initialized with ID: {agent_id}")
    
    @abstractmethod
    async def process_task(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process a task assigned to this agent
        Must be implemented by each specialized agent
        """
        pass
    
    @abstractmethod
    async def initialize(self) -> bool:
        """
        Initialize agent resources (connections, models, etc.)
        """
        pass
    
    @abstractmethod
    async def shutdown(self) -> bool:
        """
        Cleanup resources before shutdown
        """
        pass
    
    async def start(self):
        """Start the agent"""
        self.logger.info(f"Starting agent {self.agent_name}")
        await self.initialize()
        self.status = AgentStatus.RUNNING
        self.logger.info(f"Agent {self.agent_name} is now running")
    
    async def stop(self):
        """Stop the agent"""
        self.logger.info(f"Stopping agent {self.agent_name}")
        self.status = AgentStatus.IDLE
        await self.shutdown()
        self.logger.info(f"Agent {self.agent_name} stopped")
    
    def update_activity(self):
        """Update last activity timestamp"""
        self.last_activity = datetime.now()
        self.task_count += 1
    
    def handle_error(self, error: Exception):
        """Handle errors in agent execution"""
        self.error_count += 1
        self.status = AgentStatus.ERROR
        self.logger.error(f"Error in agent {self.agent_name}: {str(error)}")
    
    def get_status(self) -> Dict[str, Any]:
        """Get current agent status"""
        return {
            "agent_id": self.agent_id,
            "agent_name": self.agent_name,
            "status": self.status.value,
            "created_at": self.created_at.isoformat(),
            "last_activity": self.last_activity.isoformat(),
            "task_count": self.task_count,
            "error_count": self.error_count
        }
    
    def is_healthy(self) -> bool:
        """Check if agent is healthy"""
        return self.status == AgentStatus.RUNNING and self.error_count < 10
